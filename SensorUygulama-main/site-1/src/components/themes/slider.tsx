// import React, { useState } from "react";

// const Slider = ({ items = [] }: { items: any[] }) => {
//   interface RangeValues {
//     [key: string]: number;
//   }

//   const [rangeValues, setRangeValues] = useState<RangeValues>({});

//   const handleRangeChange = (id: string, value: number) => {
//     setRangeValues((prev) => ({ ...prev, [id]: value }));
//   };

//   Instead of conditionally rendering before the return statement,
//   we handle the empty items array directly in the JSX.
//   return (
//     <div>
//       {items.length === 0 ? (
//         <div>No items available</div>
//       ) : (
//         items.map((item: any) => (
//           <React.Fragment key={item.id}>
//             <input
//               type="range"
//               className="custom-range"
//               min="1"
//               max="100"
//               value={rangeValues[item.id] || item.ayar_değer}
//               onChange={(e) =>
//                 handleRangeChange(item.id, e.target.valueAsNumber)
//               }
//             />
//             <h4>
//               The range value is {rangeValues[item.id] || item.ayar_değer}
//             </h4>
//           </React.Fragment>
//         ))
//       )}
//     </div>
//   );
// };

// export default Slider;
