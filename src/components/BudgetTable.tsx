import { useStore } from "@tanstack/react-store";
import { Category, Group } from "../types/table.type";
import { store, updateStore } from "../util/Store";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { useEffect } from "react";

const BudgetTable = () => {
  const budgetTableData = useStore(
    store,
    (state): Group[] => state["budgetTableData"]
  );

  const toggleExpandGroup = (group_id: number) => {
    updateStore("budgetTableData", () =>
      budgetTableData?.map((group) => {
        if (group.group_id === group_id) {
          return { ...group, expanded: !group.expanded };
        }
        return group;
      })
    );
  };
  useEffect(() => {
    console.log(budgetTableData);
  }, [budgetTableData]);
  if (budgetTableData.length <= 0) {
    return <></>;
  }
  return (
    <>
      {budgetTableData &&
        budgetTableData.length >= 0 &&
        budgetTableData?.map((group: Group, index: number) => {
          return (
            <div key={index} className="my-2 w-full">
              <div className="flex w-full h-10">
                <div
                  className={`bg-purple-500 flex items-center w-3/12 ${group.expanded ? "rounded-tl-lg border-b" : "rounded-l-lg border-b-2"} border-l-2 border-r border-t-2 border-black border-solid padding`}
                >
                  {group.subRows &&
                    (group.expanded ? (
                      <FaAngleDown
                        onClick={() => toggleExpandGroup(group.group_id)}
                        className="ml-2 w-4 cursor-pointer"
                      />
                    ) : (
                      <FaAngleRight
                        onClick={() => toggleExpandGroup(group.group_id)}
                        className="ml-2 w-4 cursor-pointer"
                      />
                    ))}
                  <div
                    className="flex justify-between items-center mr-2 ml-4 w-full bg-purple-500 cursor-pointer select-none"
                    onClick={() => {}}
                  >
                    {group.name}
                    <FiEdit3 />
                  </div>
                </div>
                <div
                  className={`bg-purple-500 flex justify-center items-center w-1/4 border-2 border-black border-solid ${group.expanded ? "border-b" : "border-b-2"} border-x border-t-2`}
                >
                  {group.budgeted}
                </div>
                <div
                  className={`flex bg-purple-500 justify-center items-center w-1/4 border-l border-r border-t-2 border-black border-solid ${group.expanded ? "border-b" : "border-b-2"}`}
                >
                  {group.spent}
                </div>
                <div
                  className={`bg-purple-500 flex justify-center items-center w-1/4 ${group.expanded ? "rounded-tr-lg border-b" : "rounded-r-lg border-b-2"} border-black border-solid border-r-2 border-l border-t-2`}
                >
                  {group.balance}
                </div>
              </div>
              <div className="flex flex-wrap w-full">
                {group.expanded &&
                  group.subRows?.map((category: Category, index: number) => {
                    return (
                      <div
                        key={category.id}
                        className="flex w-full h-10 flex-grow-1"
                      >
                        <div
                          className={`flex bg-purple-300 justify-center items-center w-1/4 border-t border-l-2 border-r border-black border-solid ${group.subRows && index === group.subRows.length - 1 ? "rounded-bl-lg border-b-2" : "border-b"}`}
                        >
                          {category.name}
                        </div>
                        <div
                          className={`bg-purple-300 flex justify-center items-center w-1/4 border border-black border-solid border-x ${group.subRows && index === group.subRows.length - 1 ? "border-b-2" : "border-b"}`}
                        >
                          {group.budgeted}
                        </div>
                        <div
                          className={`bg-purple-300 flex justify-center items-center w-1/4 border-r border-l border-t border-black border-solid ${group.subRows && index === group.subRows.length - 1 ? "border-b-2" : "border-b"}`}
                        >
                          {group.spent}
                        </div>
                        <div
                          className={`bg-purple-300 flex justify-center items-center w-1/4 border-l border-t border-r-2 border-black border-solid ${group.subRows && index === group.subRows.length - 1 ? "rounded-br-lg border-b-2" : "border-b"}`}
                        >
                          {group.balance}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
    </>
  );
};

export default BudgetTable;
