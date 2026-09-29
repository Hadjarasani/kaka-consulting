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
            <h2 className="font-semibold text-[#3B0910]">
              Demandes de devis
            </h2>
          </div>

          {requests.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">
              Aucune demande de devis pour le moment.
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

                  {requests.map((request) => (
                    <tr
                      key={request.id}
                      className="transition hover:bg-gray-50"
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
                          onChange={(event) =>
                          updateStatus(request.id, event.target.value)
                          }
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
