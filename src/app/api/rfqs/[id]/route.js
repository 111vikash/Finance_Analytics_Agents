import rfqDetails from "../../../../../public/mock/rfq-details.json";

export async function GET(request, { params }) {
  // Await params to prevent asynchronous resolution issues
  const { id } = await params;

  const item = rfqDetails.data.find((rfq) => rfq.rfq_id === id);

  if (!item) {
    return Response.json(
      { success: false, message: "RFQ not found" },
      { status: 404 },
    );
  }

  return Response.json({
    success: true,
    data: item,
  });
}
