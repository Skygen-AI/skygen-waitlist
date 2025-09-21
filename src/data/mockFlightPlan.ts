// Mock data for NYC flight booking plan
export const mockFlightBookingPlan = [
  {
    id: "1",
    title: "Flight Search and Analysis",
    description: "Find available flights to New York for tomorrow morning with the best conditions",
    status: "in-progress" as const,
    priority: "high" as const,
    level: 0,
    dependencies: [],
    subtasks: [
      {
        id: "1.1",
        title: "Check flights to JFK",
        description: "Search for morning flights to John F. Kennedy Airport",
        status: "completed" as const,
        priority: "high" as const,
        tools: ["flight-search-agent", "schedule-analyzer"],
      },
      {
        id: "1.2", 
        title: "Check flights to LaGuardia",
        description: "Search for alternative flights to LaGuardia Airport",
        status: "in-progress" as const,
        priority: "medium" as const,
        tools: ["flight-search-agent", "schedule-analyzer"],
      },
      {
        id: "1.3",
        title: "Compare prices and timing",
        description: "Analyze cost and travel time for all found options",
        status: "pending" as const,
        priority: "high" as const,
        tools: ["price-analyzer", "time-calculator"],
      },
    ],
  },
  {
    id: "2", 
    title: "Document and Requirements Check",
    description: "Ensure all documents are ready for travel to the USA",
    status: "pending" as const,
    priority: "high" as const,
    level: 0,
    dependencies: [],
    subtasks: [
      {
        id: "2.1",
        title: "Check passport",
        description: "Ensure passport is valid for at least 6 months",
        status: "pending" as const,
        priority: "high" as const,
        tools: ["document-checker"],
      },
      {
        id: "2.2",
        title: "Check visa/ESTA",
        description: "Ensure valid visa or ESTA authorization is available",
        status: "pending" as const,
        priority: "high" as const,
        tools: ["visa-checker", "esta-validator"],
      },
      {
        id: "2.3",
        title: "COVID-19 requirements",
        description: "Check current COVID-19 requirements for entry to the USA",
        status: "pending" as const,
        priority: "medium" as const,
        tools: ["health-requirements-checker"],
      },
    ],
  },
  {
    id: "3",
    title: "Booking and Payment",
    description: "Book the selected flight and process payment",
    status: "pending" as const,
    priority: "high" as const,
    level: 1,
    dependencies: ["1"],
    subtasks: [
      {
        id: "3.1",
        title: "Select best option",
        description: "Based on analysis, choose optimal flight by price/quality ratio",
        status: "pending" as const,
        priority: "high" as const,
        tools: ["decision-engine"],
      },
      {
        id: "3.2",
        title: "Fill passenger details",
        description: "Enter all necessary personal information for booking",
        status: "pending" as const,
        priority: "high" as const,
        tools: ["booking-assistant", "form-filler"],
      },
      {
        id: "3.3",
        title: "Process payment",
        description: "Pay for the ticket through secure payment system",
        status: "pending" as const,
        priority: "high" as const,
        tools: ["payment-processor", "security-validator"],
      },
    ],
  },
  {
    id: "4",
    title: "Additional Services",
    description: "Arrange additional services for comfortable travel",
    status: "pending" as const,
    priority: "medium" as const,
    level: 1,
    dependencies: ["3"],
    subtasks: [
      {
        id: "4.1",
        title: "Seat selection",
        description: "Reserve preferred seat (window/aisle)",
        status: "pending" as const,
        priority: "medium" as const,
        tools: ["seat-selector", "aircraft-layout"],
      },
      {
        id: "4.2",
        title: "Special meal request",
        description: "Order special meal if needed",
        status: "pending" as const,
        priority: "low" as const,
        tools: ["meal-selector"],
      },
      {
        id: "4.3",
        title: "Travel insurance",
        description: "Arrange insurance for international flight",
        status: "pending" as const,
        priority: "medium" as const,
        tools: ["insurance-agent"],
      },
    ],
  },
];

export const mockAgentResponse = `I'll book your flight to New York for tomorrow morning! 

**Best option:** AA156 (American Airlines) - departure 09:15, arrival 13:05 (JFK) - $689

Executing booking plan:`;

// Mock data for receipt file
export const mockReceiptFile = {
  name: "flight_receipt_AA156_NYC.pdf",
  size: "247 KB",
  type: "application/pdf",
  url: "/mock-files/flight_receipt_AA156_NYC.pdf",
  downloadUrl: "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKL01lZGlhQm94IFswIDAgNTk1IDg0Ml0KPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCjUgMCBvYmoKPDwKL0xlbmd0aCAyMDAKPj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgoxMDAgNzAwIFRkCihGbGlnaHQgUmVjZWlwdCAtIEFBMTU2KSBUagpFVApCVAovRjEgMTAgVGYKMTAwIDY1MCBUZAooQW1lcmljYW4gQWlybGluZXMpIFRqCkVUCkJUCi9GMSAxMCBUZgoxMDAgNjAwIFRkCihOWUMgLSAkNjg5KSBUagpFVAplbmRzdHJlYW0KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDU4IDAwMDAwIG4gCjAwMDAwMDAxMTUgMDAwMDAgbiAKMDAwMDAwMDI0NSAwMDAwMCBuIAowMDAwMDAwMzA4IDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNgovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNTU4CiUlRU9GCg==",
  timestamp: new Date(),
  description: "Electronic receipt for AA156 flight booking to New York"
};
