import generateQuotation
from "../utils/generateQuotation";

const LeadDetailsModal = ({
  lead,
  onClose,
}) => {

  if (!lead) return null;

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

      {/* Modal */}

      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl">

        {/* Header */}

        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">

          <div>

            <h2 className="text-3xl font-bold">

              Lead Details

            </h2>

            <p className="text-gray-500 mt-1">

              Complete lead information

            </p>

          </div>

          {/* Close Button */}

          <button
            onClick={onClose}
            className="text-2xl hover:text-red-500 transition"
          >

            ✕

          </button>

        </div>

        {/* Body */}

        <div className="p-6 space-y-6">

          {/* Lead Info */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="bg-gray-100 p-4 rounded-xl">

              <p className="text-sm text-gray-500">

                Name

              </p>

              <p className="font-bold text-lg">

                {lead.name}

              </p>

            </div>

            <div className="bg-gray-100 p-4 rounded-xl">

              <p className="text-sm text-gray-500">

                Company

              </p>

              <p className="font-bold text-lg">

                {lead.company}

              </p>

            </div>

            <div className="bg-gray-100 p-4 rounded-xl">

              <p className="text-sm text-gray-500">

                Email

              </p>

              <p className="font-medium">

                {lead.email || "N/A"}

              </p>

            </div>

            <div className="bg-gray-100 p-4 rounded-xl">

              <p className="text-sm text-gray-500">

                Phone

              </p>

              <p className="font-medium">

                {lead.phone || "N/A"}

              </p>

            </div>

            <div className="bg-gray-100 p-4 rounded-xl">

              <p className="text-sm text-gray-500">

                Industry

              </p>

              <p className="font-medium">

                {lead.industry || "N/A"}

              </p>

            </div>

            <div className="bg-gray-100 p-4 rounded-xl">

              <p className="text-sm text-gray-500">

                Assigned To

              </p>

              <p className="font-medium">

                {lead.assignedTo?.name ||
                  "Unassigned"}

              </p>

            </div>

          </div>

          {/* Status + Priority */}

          <div className="flex flex-wrap gap-4">

            {/* Status */}

            <div>

              <p className="text-sm text-gray-500 mb-2">

                Status

              </p>

              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">

                {lead.status}

              </span>

            </div>

            {/* Priority */}

            <div>

              <p className="text-sm text-gray-500 mb-2">

                Priority

              </p>

              <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                lead.priority === "High"
                  ? "bg-red-100 text-red-600"
                  : lead.priority ===
                    "Medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-600"
              }`}>

                {lead.priority ||
                  "Medium"}

              </span>

            </div>

          </div>

          {/* Revenue */}

          <div className="bg-green-50 border border-green-200 p-5 rounded-2xl">

            <p className="text-sm text-green-700">

              Expected Revenue

            </p>

            <h3 className="text-3xl font-bold text-green-700 mt-1">

              ₹ {lead.expectedRevenue}

            </h3>

          </div>

          {/* Follow Up */}

          {lead.followUpDate && (

            <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-2xl">

              <p className="text-sm text-yellow-700">

                Follow-Up Date

              </p>

              <p className="font-bold text-lg mt-1">

                {new Date(
                  lead.followUpDate
                ).toLocaleString()}

              </p>

            </div>

          )}

          {/* Notes */}

          <div>

            <h3 className="text-xl font-bold mb-3">

              Notes

            </h3>

            <div className="bg-gray-100 p-4 rounded-xl">

              {lead.notes ||
                "No notes available"}

            </div>

          </div>

          {/* Activity Timeline */}

          <div>

            <h3 className="text-xl font-bold mb-4">

              Activity Timeline

            </h3>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">

              {lead.activities?.length >
              0 ? (

                lead.activities
                  .slice()
                  .reverse()
                  .map(
                    (
                      activity,
                      index
                    ) => (

                      <div
                        key={index}
                        className="bg-gray-100 p-4 rounded-xl"
                      >

                        <p className="font-medium">

                          {
                            activity.message
                          }

                        </p>

                        <p className="text-sm text-gray-500 mt-2">

                          {new Date(
                            activity.createdAt
                          ).toLocaleString()}

                        </p>

                      </div>

                    )
                  )

              ) : (

                <div className="bg-gray-100 p-5 rounded-xl text-gray-500 text-center">

                  No activity yet

                </div>

              )}

            </div>

          </div>

          {/* Buttons */}

          <div className="flex flex-wrap gap-4 pt-4">

            {/* PDF Button */}

            <button
              onClick={() =>
                generateQuotation(
                  lead
                )
              }
              className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded-xl font-semibold"
            >

              Generate Quotation

            </button>

            {/* Close */}

            <button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 transition px-6 py-3 rounded-xl font-semibold"
            >

              Close

            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default LeadDetailsModal;