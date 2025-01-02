import "./style.css";

const TableSkeleton: React.FC = () => {
  return (
    <div className="table-skeleton">
      <div className="table-skeleton-header p-3 gap-5">
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className="table-skeleton-header-cell"
          ></div>
        ))}
      </div>
      <div className="table-skeleton-body p-3">
        {[...Array(5)].map((_, rowIndex) => (
          <div key={rowIndex} className="table-skeleton-row gap-5 border-bottom py-3">
            {[...Array(7)].map((_, colIndex) => (
              <div
                key={colIndex}
                className="table-skeleton-cell"
              ></div>
            ))}
          </div>

        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
