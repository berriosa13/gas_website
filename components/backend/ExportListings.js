import React from "react";
import { Button } from "react-bootstrap";
import ExcelJS from "exceljs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ExportListings = ({ tableData, exportName }) => {
  const MySwal = withReactContent(Swal);
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(exportName);

  const handleExport = () => {
    Swal.fire({
      title: "Are you sure you want to export these listings?",
      text: "Clicking 'yes' will download this table to you computer as an excel sheet.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, export.",
    }).then((result) => {
      if (result.isConfirmed) {
        const filteredData = tableData.map((listing) => ({
          make: listing?.make,
          trim: listing?.trim,
          mileage: listing?.mileage,
          model: listing?.model,
          year: listing?.year,
          price: listing?.price,
          vin: listing?.vin,
          drivetrain: listing?.drivetrain,
          engine: listing?.engine,
          doors: listing?.doors,
          exteriorColor: listing?.exteriorColor,
          interiorColor: listing?.interiorColor,
          transmission: listing?.transmission,
          description: listing?.description,
          featuredListing: listing?.featuredListing,
          sold: listing?.sold,
          createdAt: listing?.createdAt?.toDate(),
          dateSold: listing?.dateSold?.toDate()
        }));

        // Generate the headers from the keys of the first listing
        const headers = Object.keys(filteredData[0]).map((header) =>
          header.toUpperCase()
        );

        worksheet.addRow(headers);

        // Add each listing as a row in the worksheet
        filteredData.forEach((listing) => {
          const rowValues = Object.values(listing);
          worksheet.addRow(rowValues);
        });

        // Create a buffer from the workbook and save it as a file
        workbook.xlsx.writeBuffer().then((buffer) => {
          const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${exportName}.xlsx`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      }
    });
  };

  return (
    <Button className="mb-5" variant="primary" onClick={handleExport}>
      Export to Excel
    </Button>
  );
};

export default ExportListings;
