"use client";

import { Pagination } from "flowbite-react";
import { IPagination } from "../api/interfaces";

export const PaginationComponent = (props: IPagination) => {
  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        currentPage={props.currentPage}
        totalPages={props.totalPages}
        onPageChange={props.onPageChange}
        showIcons
      />
    </div>
  );
};
