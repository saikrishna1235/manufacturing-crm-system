import { useDroppable } from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import LeadCard from "./LeadCard";

const PipelineColumn = ({
  status,
  leads,
  setSelectedLead,
}) => {

  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (

    <div
      ref={setNodeRef}
      className="bg-gray-100 w-[280px] rounded-2xl p-3 flex-shrink-0 min-h-[500px]"
    >

      <h2 className="text-xl font-bold mb-4">

        {status}

      </h2>

      <SortableContext
        items={leads.map(
          (lead) => String(lead._id)
        )}
        strategy={
          verticalListSortingStrategy
        }
      >

        <div className="space-y-4 min-h-[500px] max-h-[70vh] overflow-y-auto pr-1">

          {leads.map((lead) => (

            <LeadCard
              key={lead._id}
              lead={lead}
              onClick={
                setSelectedLead
              }
            />

          ))}

        </div>

      </SortableContext>

    </div>
  );
};

export default PipelineColumn;