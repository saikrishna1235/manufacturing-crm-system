import { useSortable } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import { GripVertical } from "lucide-react";

const LeadCard = ({
  lead,
  onClick,
}) => {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: String(lead._id),
  });

  const style = {

    transform:
      CSS.Transform.toString(transform),

    transition:
      transition ||
      "transform 250ms ease",

  };

  return (

    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-4 rounded-xl shadow hover:shadow-2xl transition relative border border-gray-100"
    >

      {/* Drag Handle */}

      <button
        {...attributes}
        {...listeners}
        onClick={(e) =>
          e.stopPropagation()
        }
        className="absolute top-3 right-3 cursor-grab active:cursor-grabbing text-gray-500 hover:text-black"
      >

        <GripVertical size={18} />

      </button>

      {/* Card Content */}

      <div
        onClick={() =>
          onClick(lead)
        }
        className="cursor-pointer"
      >

        {/* Lead Name */}

        <h3 className="font-bold text-lg pr-6">

          {lead.name}

        </h3>

        {/* Company */}

        <p className="text-gray-600 mt-1">

          {lead.company}

        </p>

        {/* Revenue */}

        <p className="text-sm mt-3 font-medium">

          ₹ {lead.expectedRevenue}

        </p>

        {/* Priority */}

        <div className="mt-4">

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              lead.priority === "High"
                ? "bg-red-100 text-red-600"
                : lead.priority ===
                  "Medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-600"
            }`}
          >

            {lead.priority || "Medium"}

          </span>

        </div>

        {/* Assigned User */}

        <div className="mt-4 text-sm text-gray-500">

          Assigned To:
          {" "}

          <span className="font-medium text-gray-700">

            {lead.assignedTo?.name ||
              "Unassigned"}

          </span>

        </div>

      </div>

    </div>
  );
};

export default LeadCard;