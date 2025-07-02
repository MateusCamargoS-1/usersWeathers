import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

interface ResponsivePaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const ResponsivePagination = ({
  page,
  totalPages,
  onPageChange,
}: ResponsivePaginationProps) => {
  const renderNumericPages = () => {
    const pages = [];

    if (page > 2) {
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink onClick={() => onPageChange(1)} href="#">
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (page > 3) {
        pages.push(
          <PaginationItem key="start-ellipsis">
            <span className="px-2 text-gray-500">...</span>
          </PaginationItem>
        );
      }
    }

    for (let i = -1; i <= 1; i++) {
      const pageNumber = page + i;
      if (pageNumber > 1 && pageNumber < totalPages) {
        pages.push(
          <PaginationItem key={pageNumber}>
            <PaginationLink
              isActive={pageNumber === page}
              onClick={() => onPageChange(pageNumber)}
              href="#"
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    if (page < totalPages - 1) {
      if (page < totalPages - 2) {
        pages.push(
          <PaginationItem key="end-ellipsis">
            <span className="px-2 text-gray-500">...</span>
          </PaginationItem>
        );
      }

      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => onPageChange(totalPages)}
            href="#"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <div className="mt-8 flex justify-center">
      <div className="hidden sm:flex">
        <Pagination aria-label="Paginação">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(page - 1)}
                aria-disabled={page === 1}
                tabIndex={page === 1 ? -1 : 0}
              />
            </PaginationItem>

            {renderNumericPages()}

            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(page + 1)}
                aria-disabled={page === totalPages}
                tabIndex={page === totalPages ? -1 : 0}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <div className="sm:hidden flex items-center gap-2">
        <Button
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          ←
        </Button>
        <span className="text-sm text-gray-600">
          Página <strong>{page}</strong> de <strong>{totalPages}</strong>
        </span>
        <Button
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          →
        </Button>
      </div>
    </div>
  );
};
