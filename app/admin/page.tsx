"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type QuoteRequest = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string;
  phone: string | null;
  project_type: string;
  budget: string | null;
  deadline: string | null;
  message: string;
  status: string;
  archived_at: string | null;
};

const STATUSES = [
  "Nouvelle",
  "En cours",
  "Devis envoyé",
  "Acceptée",
  "Refusée",
  "Terminée",
];

//couleur dynamique du sélecteur
function getStatusStyle(status: string) {
  const styles: Record<string, string> = {
    Nouvelle: "bg-gray-100 text-gray-700 border-gray-200",
    "En cours": "bg-blue-100 text-blue-700 border-blue-200",
    "Devis envoyé": "bg-purple-100 text-purple-700 border-purple-200",
    Acceptée: "bg-green-100 text-green-700 border-green-200",
    Refusée: "bg-red-100 text-red-700 border-red-200",
    Terminée: "bg-gray-200 text-gray-700 border-gray-300",
  };

  return styles[status] ?? "bg-gray-100 text-gray-700 border-gray-200";
}

export default function AdminPage() {
  const router = useRouter();

  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRequest, setSelectedRequest] =
  useState<QuoteRequest | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [showArchived, setShowArchived] = useState(false);

  //créer les demandes filtrées
  const filteredRequests = requests.filter((request) => {
    const searchValue = search.toLowerCase().trim();

    const matchesArchive =
      showArchived
        ? request.archived_at !== null
        : request.archived_at === null;

    const matchesSearch =
      request.company.toLowerCase().includes(searchValue) ||
      request.name.toLowerCase().includes(searchValue) ||
      request.email.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "Tous" ||
      request.status === statusFilter;

    return matchesArchive && matchesSearch && matchesStatus;
 });

  //modification du status dans la base de données et mis à jour immédiat du tableau à l'écran
  async function updateStatus(id: string, status: string) {
    const { error } = await supabase
      .from("quote_requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error(error);
      setError("Impossible de modifier le statut.");
      return;
    }

    setRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === id
          ? { ...request, status }
          : request
      )
    );
  }

  //fonction d'archivage
  async function archiveRequest(id: string) {
    const archivedAt = new Date().toISOString();

    const { error } = await supabase
      .from("quote_requests")
      .update({
        archived_at: archivedAt,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      setError("Impossible d'archiver la demande.");
      return;
    }

    setRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === id
          ? {
              ...request,
              archived_at: archivedAt,
            }
          : request
      )
    );

    setSelectedRequest(null);
  }

  //fonction de restauration
  async function restoreRequest(id: string) {
    const { error } = await supabase
      .from("quote_requests")
      .update({
        archived_at: null,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      setError("Impossible de restaurer la demande.");
      return;
    }

    setRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === id
          ? {
              ...request,
              archived_at: null,
            }
          : request
      )
    );

    setSelectedRequest(null);
  }

  useEffect(() => {
    async function loadAdmin() {
      // 1. Vérifier la connexion
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      // 2. Vérifier que l'utilisateur est administrateur
      console.log("USER AUTH :", user.id);
      const { data: isAdmin, error: adminError } =
        await supabase.rpc("is_admin");
      
      console.log("isAdmin :", isAdmin);
      console.log("adminError :", adminError);

      if (adminError || !isAdmin) {
        await supabase.auth.signOut();
        router.replace("/login");
        return;
      }

      // 3. Récupérer les demandes
      const { data, error: requestsError } = await supabase
        .from("quote_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (requestsError) {
        console.error(requestsError);
        setError("Impossible de récupérer les demandes.");
        setLoading(false);
        return;
      }

      setRequests(data ?? []);
      setLoading(false);
    }

    loadAdmin();
  }, [router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Chargement...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* En-tête */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#3B0910]">
              Administration
            </h1>

            <p className="mt-2 text-gray-500">
              Gestion des demandes de devis
            </p>
          </div>

          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/login");
            }}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Se déconnecter
          </button>
        </div>

        {/* Erreur */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Statistiques */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-7">

          <StatCard
            label="Total"
            value={requests.length}
          />

          <StatCard
            label="Nouvelles"
            value={requests.filter((r) => r.status === "Nouvelle").length}
          />

          <StatCard
            label="En cours"
            value={requests.filter((r) => r.status === "En cours").length}
          />

          <StatCard
            label="Devis envoyés"
            value={
              requests.filter((r) => r.status === "Devis envoyé").length
            }
          />

          <StatCard
            label="Acceptées"
            value={requests.filter((r) => r.status === "Acceptée").length}
          />

          <StatCard
            label="Refusées"
            value={requests.filter((r) => r.status === "Refusée").length}
          />

          <StatCard
            label="Terminées"
            value={requests.filter((r) => r.status === "Terminée").length}
          />

        </div>

        {/* Tableau */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="border-b border-gray-200 px-6 py-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              <div>
                <h2 className="font-semibold text-[#3B0910]">
                  Demandes de devis
                </h2>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowArchived(false);
                      setSearch("");
                      setStatusFilter("Tous");
                    }}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                      !showArchived
                        ? "bg-[#4A0015] text-white"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    Actives
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowArchived(true);
                      setSearch("");
                      setStatusFilter("Tous");
                    }}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                      showArchived
                        ? "bg-[#4A0015] text-white"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    Archivées
                  </button>
                </div>

                <p className="mt-1 text-sm text-gray-500">
                  {filteredRequests.length} demande
                  {filteredRequests.length !== 1 ? "s" : ""} affichée
                  {filteredRequests.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                {/* recherche */}
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Rechercher..."
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#4A0015] focus:ring-2 focus:ring-[#4A0015]/10 sm:w-64"
                  />

                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    🔍
                  </span>
                </div>

                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#4A0015] focus:ring-2 focus:ring-[#4A0015]/10"
                >
                  <option value="Tous">Tous les statuts</option>

                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                {(search || statusFilter !== "Tous") && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setStatusFilter("Tous");
                    }}
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-[#4A0015] transition hover:bg-gray-50"
                  >
                    Réinitialiser
                  </button>
                )}
                </div>
              </div>

          {filteredRequests.length === 0 ? (
            <div className="px-6 py-12 text-center ">
              {requests.length === 0 ? (
                <p className="text-gray-500">
                  Aucune demande de devis pour le moment.
                </p>
              ) : (
                <>
                  <p>
                    Aucune demande ne correspond à votre recherche.
                  </p>

                  <button
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("Tous");
                  }}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-[#4A0015] transition hover:bg-gray-50"
                  >
                    Réinitialiser les filtres
                  </button>
                </>
              
              )}
              
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full text-left text-sm">

                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-6 py-4 font-medium">
                      Entreprise
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Contact
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Projet
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Date
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Statut
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">

                  {filteredRequests.map((request) => (
                    <tr
                      key={request.id}
                      onClick={() => setSelectedRequest(request)}
                      className="cursor-pointer transition hover:bg-gray-50"
                    >

                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {request.company}
                        </div>

                        <div className="text-xs text-gray-500">
                          {request.name}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-gray-900">
                          {request.email}
                        </div>

                        {request.phone && (
                          <div className="text-xs text-gray-500">
                            {request.phone}
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        {request.project_type}
                      </td>

                      <td className="px-6 py-4 text-gray-500">
                        {new Date(request.created_at).toLocaleDateString(
                          "fr-FR"
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <select
                          value={request.status}
                          onClick={(event) => event.stopPropagation()}
                          onChange={(event) => {
                            event.stopPropagation();
                            updateStatus(request.id, event.target.value)
                          }}
                          className={`rounded-full border px-3 py-1.5 text-xs font-medium outline-none transition ${getStatusStyle(
                            request.status
                          )} focus:border-[#4A0015] focus:ring-2 focus:ring-[#4A0015]/10`}
                        >
                          {STATUSES.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                        ))}
                        </select>
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>
      </div>
      {selectedRequest && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6 py-10"
    onClick={() => setSelectedRequest(null)}
  >
    <div
      className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
      onClick={(event) => event.stopPropagation()}
    >
      {/* En-tête */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
        <div>
          <h2 className="text-xl font-semibold text-[#3B0910]">
            Détails de la demande
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Reçue le{" "}
            {new Date(
              selectedRequest.created_at
            ).toLocaleDateString("fr-FR")}
          </p>
        </div>

        <button
          onClick={() => setSelectedRequest(null)}
          className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
          aria-label="Fermer"
        >
          ✕
        </button>
      </div>

      {/* Contenu */}
      <div className="space-y-8 px-6 py-6">

        {/* Entreprise / contact */}
        <section>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
            Contact
          </h3>

          <div className="grid gap-5 sm:grid-cols-2">
            <DetailItem
              label="Entreprise"
              value={selectedRequest.company}
            />

            <DetailItem
              label="Nom"
              value={selectedRequest.name}
            />

            <DetailItem
              label="Email"
              value={selectedRequest.email}
            />

            <DetailItem
              label="Téléphone"
              value={selectedRequest.phone || "Non renseigné"}
            />
          </div>
        </section>

        {/* Projet */}
        <section>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
            Projet
          </h3>

          <div className="grid gap-5 sm:grid-cols-2">
            <DetailItem
              label="Type de projet"
              value={selectedRequest.project_type}
            />

            <DetailItem
              label="Budget"
              value={selectedRequest.budget || "Non renseigné"}
            />

            <DetailItem
              label="Délai souhaité"
              value={selectedRequest.deadline || "Non renseigné"}
            />
          </div>
        </section>

        {/* Message */}
        <section>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
            Message
          </h3>

          <div className="rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-700">
            {selectedRequest.message}
          </div>
        </section>

        {/* Statut */}
        <section>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
            Statut
          </h3>

          <select
            value={selectedRequest.status}
            onChange={(event) => {
              const newStatus = event.target.value;

              updateStatus(selectedRequest.id, newStatus);

              setSelectedRequest({
                ...selectedRequest,
                status: newStatus,
              });
            }}
            className={`rounded-full border px-4 py-2 text-sm font-medium outline-none transition ${getStatusStyle(
              selectedRequest.status
            )} focus:border-[#4A0015] focus:ring-2 focus:ring-[#4A0015]/10`}
          >

            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <div className="mt-6 flex justify-end">
              {selectedRequest.archived_at === null ? (
                <button
                  type="button"
                  onClick={() => archiveRequest(selectedRequest.id)}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
                >
                  Archiver la demande
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => restoreRequest(selectedRequest.id)}
                  className="rounded-lg border border-[#4A0015]/20 px-4 py-2 text-sm font-medium text-[#4A0015] transition hover:bg-[#4A0015]/5"
                >
                  Restaurer la demande
                </button>
              )}
            </div>
        </section>
      </div>
    </div>
  </div>
)}
  </div>
    </main>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-[#3B0910]">
        {value}
      </p>
    </div>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm text-gray-800">
        {value}
      </p>
    </div>
  );
}
