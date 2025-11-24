// import React from "react";

// export default function LevelDetailPage({ params }: { params: { id: string } }) {
//   const { id } = params;

//   // Fetch your level details here by id if needed
//   // e.g., const data = await getLevel(id)

//   return (
//     <main className="min-vh-100" style={{ paddingTop: "100px", background: "var(--dark-bg)" }}>
//       <div className="container py-5">
//         <h1 className="text-yellow fw-bold mb-3">Level {id} Details</h1>
//         {/* Render your <LevelDetails /> UI here, pass id as prop */}
//         {/* <LevelDetails id={Number(id)} /> */}
//       </div>
//     </main>
//   );
// }

// app/levels/[id]/page.tsx
import React from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import LevelDetails from "@/components/levels/LevelDetails";

type Params = { id: string };

export default async function LevelDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;         // <-- important in Next 15
  const levelId = Number(id);

  return (
    <>
      <Header />
      <main
        className="min-vh-100"
        style={{ paddingTop: "100px", background: "var(--dark-bg)" }}
      >
        <div className="container">
          <LevelDetails id={levelId} />
        </div>
      </main>
      <Footer />
    </>
  );
}
