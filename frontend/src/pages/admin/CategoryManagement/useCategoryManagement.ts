import { useState } from "react";
import { toast } from "react-toastify";
import {
  useViewCategoryQuery,
  useDeleteCategoryMutation,
} from "../../../api/adminService";


export const useCategoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, isFetching } = useViewCategoryQuery(searchTerm);
  const [deleteCategory, { isLoading: deleteLoading }] =
    useDeleteCategoryMutation();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteCategory(id).unwrap();
      toast.success(response?.message);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message);
    }
  };

  return {
    categories: data?.categories || [],
    searchTerm,
    isLoading: isLoading || deleteLoading || isFetching,
    handleSearchChange,
    handleDelete,
  };
};
