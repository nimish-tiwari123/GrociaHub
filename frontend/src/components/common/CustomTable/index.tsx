import React, { ReactNode } from "react";
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
  icon: ReactNode;
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

  const handleHeaderCheckboxChange = () => {
    const allSelected = selectedRows.length === data.length;
    const newSelection = allSelected ? [] : [...data];
    setSelectedRows(newSelection);
    if (onCheckboxChange) onCheckboxChange(newSelection);
  };

  const handleToggleChange = (row: any, colKey: string) => {
    const newValue = !row[colKey];
    if (columns.find((col) => col.key === colKey)?.togglerHandler) {
      columns
        .find((col) => col.key === colKey)
        ?.togglerHandler?.(newValue, row);
    }
    row[colKey] = newValue;
  };

  return (
    <div className="custom-table overflow-auto">
      <div className="custom-table-header rounded">
        {columns.map((col) => {
          if (col.type === "checkbox") {
            return (
              <div
                key={col.key}
                className="custom-table-column-header my-2 checkbox-cell"
              >
                <Form.Check
                  type="checkbox"
                  onChange={handleHeaderCheckboxChange}
                  checked={selectedRows.length === data.length && data.length > 0}
                />
              </div>
            );
          }
          return (
            <div key={col.key} className="custom-table-column-header my-2">
              {col.header}
            </div>
          );
        })}
        {actions && actions.length > 0 && (
          <div className="custom-table-column-header my-2">Action</div>
        )}
      </div>

      <div className="custom-table-body">
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className="custom-table-row">
            {columns.map((col) => {
              const value = row[col.key];
              switch (col.type) {
                case "checkbox":
                  return (
                    <div key={col.key} className="custom-table-cell checkbox-cell">
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
                          <div className="fw-bold">{value}</div>
                          <small className="fw-medium opacity-50">
                            {row.category}
                          </small>
                        </div>
                      </div>
                    </div>
                  );

                case "toggler":
                  return (
                    <div key={col.key} className="custom-table-cell">
                      <Form.Check
                        type="switch"
                      
                        checked={!row[col.key]}
                        onChange={() => handleToggleChange(row, col.key)}
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

            {actions && (
              <div className="custom-table-cell">
                <Dropdown>
                  <Dropdown.Toggle variant="link" className="p-0 rounded-circle py-1 px-2 bg-secondary-subtle text-dark opacity-75">
                    <BsThreeDotsVertical />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {actions.map((action, idx) => (
                      <Dropdown.Item
                        key={idx}
                        onClick={() => action.onClick(row)}
                      >
                        <span className="text-custom-primary me-2">{action.icon}</span>
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
