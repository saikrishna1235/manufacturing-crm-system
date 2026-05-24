import {
  DndContext,
  closestCorners,
  DragOverlay,
} from "@dnd-kit/core";

import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

import PipelineColumn from "../components/PipelineColumn";

import LeadDetailsModal
from "../components/LeadDetailsModal";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
const statuses = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Negotiation",
  "Closed Won",
  "Closed Lost",
];

const Pipeline = () => {

  const [
    selectedLead,
    setSelectedLead,
  ] = useState(null);

  const [leads, setLeads] =
    useState([]);

  const [
    activeLead,
    setActiveLead,
  ] = useState(null);

  // ===========================
  // Fetch Leads
  // ===========================

  const fetchLeads = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await API.get(
        "/leads",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setLeads(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // ===========================
  // Drag Start
  // ===========================

  const handleDragStart = (
    event
  ) => {

    const lead = leads.find(
      (item) =>
        item._id === event.active.id
    );

    setActiveLead(lead);
  };

  // ===========================
  // Drag End
  // ===========================

  // ===========================
// Drag End
// ===========================

const handleDragEnd = async (
  event
) => {

  const { active, over } =
    event;

  setActiveLead(null);

  if (!over) return;

  const leadId = String(active.id);

  // =========================
  // IMPORTANT FIX
  // =========================

  let newStatus = over.id;

  // If dropped over another card,
  // get that card's status

  const overLead = leads.find(
    (lead) =>
      lead._id === String(over.id)
  );

  if (overLead) {
    newStatus = overLead.status;
  }

  // =========================
  // Prevent invalid drops
  // =========================

  if (
    !statuses.includes(newStatus)
  ) {
    return;
  }

  try {

    const token =
      localStorage.getItem("token");

    // Find current lead

    const currentLead =
      leads.find(
        (lead) =>
          lead._id === leadId
      );

    if (!currentLead) return;

    // Prevent same-column update

    if (
      currentLead.status ===
      newStatus
    ) {
      return;
    }

    // =======================
    // Optimistic UI Update
    // =======================

    setLeads((prev) =>
      prev.map((lead) =>
        lead._id === leadId
          ? {
              ...lead,
              status: newStatus,
            }
          : lead
      )
    );

    // =======================
    // Backend Update
    // =======================

    const response =
      await API.put(
        `/leads/${leadId}`,
        {
          ...currentLead,
          status: newStatus,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    console.log(
      "Updated Lead:",
      response.data
    );

    // Refresh latest data

    fetchLeads();

  } catch (error) {

    console.log(error);

    // Rollback if error

    fetchLeads();
  }
};

  return (

    <div>

      {/* Title */}

      <h1 className="text-3xl font-bold mb-8">

        CRM Pipeline

      </h1>

      <DndContext
        collisionDetection={
          closestCorners
        }
        onDragStart={
          handleDragStart
        }
        onDragEnd={
          handleDragEnd
        }
      >

        {/* Scroll Wrapper */}

        <div className="overflow-x-auto pb-4">

          {/* Pipeline Board */}

          <div className="flex gap-4 w-max">

            {statuses.map((status) => {

  const columnLeads = leads.filter(
    (lead) => lead.status === status
  );

  return (

    <SortableContext
      key={status}
      items={columnLeads.map(
        (lead) => lead._id
      )}
      strategy={
        verticalListSortingStrategy
      }
    >

      <PipelineColumn
        setSelectedLead={setSelectedLead}
        status={status}
        leads={columnLeads}
      />

    </SortableContext>

  );
})}

          </div>

        </div>

        {/* Drag Overlay */}

        <DragOverlay>

          {activeLead ? (

            <div className="bg-white p-4 rounded-xl shadow-2xl w-[260px] rotate-3 opacity-90">

              <h3 className="font-bold text-lg">

                {activeLead.name}

              </h3>

              <p className="text-gray-600">

                {activeLead.company}

              </p>

              <p className="text-sm mt-2">

                ₹{" "}
                {
                  activeLead.expectedRevenue
                }

              </p>

            </div>

          ) : null}

        </DragOverlay>

        {/* Lead Modal */}

        <LeadDetailsModal
          lead={selectedLead}
          onClose={() =>
            setSelectedLead(null)
          }
        />

      </DndContext>

    </div>
  );
};

export default Pipeline;