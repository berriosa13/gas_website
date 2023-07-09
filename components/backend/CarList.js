import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  Button,
  OverlayTrigger,
  Tooltip,
  Tab,
  Tabs,
} from "react-bootstrap";
import Image from "next/image";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { FaRegImages } from "react-icons/fa";
import { BsArrowRightShort } from "react-icons/bs";
import { TbFileDescription } from "react-icons/tb";
import useActiveListings from "../../hooks/useActiveListings";
import useInactiveListings from "../../hooks/useInactiveListings";
import ExportListings from "./ExportListings";

const CarsList = ({
  getCarId,
  getIsImageModalOpen,
  getIndividualCarData,
  getIdForDeletion,
  getIsDescriptionModalOpen,
}) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const activeListings = useActiveListings();
  const inactiveListings = useInactiveListings();

  const [currentTab, setCurrentTab] = useState("active");

  // Handle tab change
  const handleTabChange = (eventKey) => {
    setCurrentTab(eventKey);
  };

    // Get the appropriate listings based on the current tab, useMemo to prevent rerunning this function unecessisarily
    const getCurrentListings = useMemo(() => {
      if (currentTab === "active") {
        return activeListings;
      } else {
        return inactiveListings;
      }
    }, [activeListings, inactiveListings, currentTab]);

  const handleColumnSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const renderTableRows = (listings) => {
    const sortedListings = [...listings].sort((a, b) => {
      if (sortColumn) {
        if (a[sortColumn] < b[sortColumn]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sortedListings.map((doc, index) => (
      <tr key={doc.id} className="text-center">
        <td>{index + 1}</td>
        <td>
          <div className="d-flex justify-content-center align-items-center">
            {doc.make} {doc.model}
          </div>
        </td>
        <td>{doc.trim}</td>
        <td>{doc.mileage}</td>
        <td>{doc.price}</td>
        <td>{doc.year}</td>
        <td>#{doc.vin}</td>
        <td>
          Drivetrain <BsArrowRightShort /> {doc.drivetrain} <br />
          Transmission <BsArrowRightShort /> {doc.transmission} <br />
          Engine <BsArrowRightShort /> {doc.engine} <br />
          Doors <BsArrowRightShort /> {doc.doors}
        </td>
        <td>
          Interior <BsArrowRightShort /> {doc.interiorColor} <br />
          Exterior <BsArrowRightShort /> {doc.exteriorColor}
        </td>
        <td>{doc.createdAt && doc.createdAt.toDate().toLocaleString()}</td>
        <td>{doc.dateSold ? doc.dateSold.toDate().toLocaleString() : 'N.A'}</td>

        <td>{doc.featuredListing}</td>
        <td>
          {["View"].map((placement) => (
            <OverlayTrigger
              key={placement}
              placement="top"
              overlay={
                <Tooltip id={`tooltip-${placement}`}>
                  <strong>{placement}</strong> description.
                </Tooltip>
              }
            >
              <Button
                variant="primary"
                className="m-1"
                size="lg"
                onClick={() => {
                  getIsDescriptionModalOpen(true);
                  getIndividualCarData(doc);
                }}
              >
                <TbFileDescription />
              </Button>
            </OverlayTrigger>
          ))}
        </td>
        {doc.thumbnailImage != null ? (
          <td>
            <Image
              src={doc.thumbnailImage}
              className=""
              width="100"
              height="100"
              alt="thumbnailImage"
            />
          </td>
        ) : (
          <td>Not set</td>
        )}
        <td>
          {["Display"].map((placement) => (
            <OverlayTrigger
              key={placement}
              placement="top"
              overlay={
                <Tooltip id={`tooltip-${placement}`}>
                  <strong>{placement}</strong> all images.
                </Tooltip>
              }
            >
              <Button
                variant="primary"
                className="m-1"
                size="lg"
                onClick={() => {
                  getIsImageModalOpen(true);
                  getIndividualCarData(doc);
                }}
              >
                <FaRegImages />
              </Button>
            </OverlayTrigger>
          ))}
          {["Edit"].map((placement) => (
            <OverlayTrigger
              key={placement}
              placement="top"
              overlay={
                <Tooltip id={`tooltip-${placement}`}>
                  <strong>{placement}</strong> this listing.
                </Tooltip>
              }
            >
              <Button
                size="lg"
                className="m-1"
                variant="primary"
                onClick={(e) => getCarId(doc.id)}
              >
                <AiOutlineEdit />
              </Button>
            </OverlayTrigger>
          ))}
          {["Delete"].map((placement) => (
            <OverlayTrigger
              key={placement}
              placement="top"
              overlay={
                <Tooltip id={`tooltip-${placement}`}>
                  <strong>{placement}</strong> this listing.
                </Tooltip>
              }
            >
              <Button
                variant="primary"
                size="lg"
                className="m-1"
                onClick={() => {
                  getIdForDeletion(doc.id);
                }}
              >
                <AiOutlineDelete />
              </Button>
            </OverlayTrigger>
          ))}
        </td>
      </tr>
    ));
  };

  const renderTable = (listings) => (
    <Table
      variant="dark"
      responsive="lg"
      bordered
      hover
      size="sm"
      className="text-center"
    >
      <thead>
        <tr>
          <th className="table-header">#</th>
          <th className="table-header" onClick={() => handleColumnSort("make")}>
            Make/Model{" "}
            {sortColumn === "make" && (
              <span>
                {sortOrder === "asc" ? (
                  <AiOutlineSortAscending />
                ) : (
                  <AiOutlineSortDescending />
                )}
              </span>
            )}
          </th>
          <th className="table-header">Trim</th>
          <th
            className="table-header"
            onClick={() => handleColumnSort("mileage")}
          >
            Mileage{" "}
            {sortColumn === "mileage" && (
              <span>
                {sortOrder === "asc" ? (
                  <AiOutlineSortAscending />
                ) : (
                  <AiOutlineSortDescending />
                )}
              </span>
            )}
          </th>
          <th
            className="table-header"
            onClick={() => handleColumnSort("price")}
          >
            Price{" "}
            {sortColumn === "price" && (
              <span>
                {sortOrder === "asc" ? (
                  <AiOutlineSortAscending />
                ) : (
                  <AiOutlineSortDescending />
                )}
              </span>
            )}
          </th>
          <th className="table-header" onClick={() => handleColumnSort("year")}>
            Year{" "}
            {sortColumn === "year" && (
              <span>
                {sortOrder === "asc" ? (
                  <AiOutlineSortAscending />
                ) : (
                  <AiOutlineSortDescending />
                )}
              </span>
            )}
          </th>
          <th className="table-header">Vin</th>
          <th className="table-header">Misc</th>
          <th className="table-header">Color</th>
          <th
            className="table-header"
            onClick={() => handleColumnSort("createdAt")}
          >
            Date Added{" "}
            {sortColumn === "createdAt" && (
              <span>
                {sortOrder === "asc" ? (
                  <AiOutlineSortAscending />
                ) : (
                  <AiOutlineSortDescending />
                )}
              </span>
            )}
          </th>
          <th
            className="table-header"
            onClick={() => handleColumnSort("dateSold")}
          >
            Date Sold{" "}
            {sortColumn === "dateSold" && (
              <span>
                {sortOrder === "asc" ? (
                  <AiOutlineSortAscending />
                ) : (
                  <AiOutlineSortDescending />
                )}
              </span>
            )}
          </th>
          <th
            className="table-header"
            onClick={() => handleColumnSort("featuredListing")}
          >
            Featured Listing?{" "}
            {sortColumn === "featuredListing" && (
              <span>
                {sortOrder === "asc" ? (
                  <AiOutlineSortAscending />
                ) : (
                  <AiOutlineSortDescending />
                )}
              </span>
            )}
          </th>
          <th className="table-header">Description</th>
          <th className="table-header">Thumbnail</th>
          <th className="table-header">View/Edit/Delete</th>
        </tr>
      </thead>
      <tbody>{renderTableRows(listings)}</tbody>
    </Table>
  );

  return (
    <>
      {/* Render the ExportButton component */}
      <ExportListings tableData={getCurrentListings} exportName={currentTab === "active" ? "ActiveListings" : "SoldListings"} />
      <Tabs
        defaultActiveKey="active"
        className=""
        activeKey={currentTab}
        onSelect={handleTabChange}
      >
        <Tab eventKey="active" title="Active Listings">
          {renderTable(useActiveListings())}
        </Tab>
        <Tab eventKey="sold" title="Sold Listings">
          {renderTable(useInactiveListings())}
        </Tab>
      </Tabs>
      <style jsx global>{`
        .nav-tabs .nav-link:hover,
        .nav-tabs .nav-link:focus {
          color: var(--main-color);
        }
        .nav-link {
          color: var(--rich-black);
        }
        .nav-tabs .nav-link.active,
        .nav-tabs .nav-item.show .nav-link {
          color: var(--rich-black);
        }
        .table-header {
          background-color: var(--secondary-color) !important;
        }
      `}</style>
    </>
  );
};

export default CarsList;
