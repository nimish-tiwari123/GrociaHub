import React from "react";
import { Dropdown, Form } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./style.css";

type ColumnType =
  | "text"
  | "checkbox"
  | "action"
  | "status"
  | "image"
  | "product"
  | "toggler";

interface Column {
  key: string;
  header: string;
  type: ColumnType;
  customRender?: (value: any, row: any) => React.ReactNode;
  statusStyles?: (value: string) => string;
  togglerHandler?: (value: boolean, row: any) => void;
}

interface Action {
  label: string;
  onClick: (row: any) => void;
}

interface CustomTableProps {
  columns: Column[];
  data: any[];
  actions?: Action[];
  onCheckboxChange?: (selectedRows: any[]) => void;
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  data,
  actions,
  onCheckboxChange,
}) => {
  const [selectedRows, setSelectedRows] = React.useState<any[]>([]);

  const handleCheckboxChange = (row: any) => {
    const updatedSelection = selectedRows.includes(row)
      ? selectedRows.filter((r) => r !== row)
      : [...selectedRows, row];
    setSelectedRows(updatedSelection);
    if (onCheckboxChange) onCheckboxChange(updatedSelection);
  };

  return (
    <div className="custom-table overflow-auto">
      {/* Table Header */}
      <div className="custom-table-header rounded">
        {columns.map((col) => (
          <div key={col.key} className="custom-table-column-header my-2">
            {col.header}
          </div>
        ))}
        {actions && actions.length > 0 && (
          <div className="custom-table-column-header">Action</div>
        )}
      </div>

      {/* Table Body */}
      <div className="custom-table-body">
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className="custom-table-row">
            {columns.map((col) => {
              const value = row[col.key];
              switch (col.type) {
                case "checkbox":
                  return (
                    <div key={col.key} className="custom-table-cell">
                      <Form.Check
                        type="checkbox"
                        checked={selectedRows.includes(row)}
                        onChange={() => handleCheckboxChange(row)}
                      />
                    </div>
                  );

                  case "status":
                    return (
                      <div key={col.key} className="custom-table-cell">
                        {col.statusStyles ? col.statusStyles(value) : value}
                      </div>
                    );
                  
                case "action":
                  return null;

                case "image":
                  return (
                    <div key={col.key} className="custom-table-cell">
                      <img
                        src={value}
                        alt=""
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  );

                case "product":
                  return (
                    <div key={col.key} className="custom-table-cell">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <img
                          src={row.image}
                          alt=""
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <div>{value}</div>
                          <small>{row.category}</small>
                        </div>
                      </div>
                    </div>
                  );

                case "toggler":
                  return (
                    <div key={col.key} className="custom-table-cell">
                      <Form.Check
                        type="switch"
                        checked={!!value}
                        onChange={() =>
                          col.togglerHandler && col.togglerHandler(!!value, row)
                        }
                      />
                    </div>
                  );

                default:
                  return (
                    <div key={col.key} className="custom-table-cell">
                      {col.customRender ? col.customRender(value, row) : value}
                    </div>
                  );
              }
            })}

            {/* Actions */}
            {actions && (
              <div className="custom-table-cell">
                <Dropdown>
                  <Dropdown.Toggle variant="link" className="p-0">
                    <BsThreeDotsVertical />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {actions.map((action, idx) => (
                      <Dropdown.Item
                        key={idx}
                        onClick={() => action.onClick(row)}
                      >
                        {action.label}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomTable;
