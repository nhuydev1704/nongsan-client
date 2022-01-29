export const GRID_DEFAULT_LOCALE_TEXT = {
    // Root
    noRowsLabel: 'Không có hàng',
    noResultsOverlayLabel: 'Không tim được kêt quả.',
    errorOverlayDefaultLabel: 'Đã xảy ra lỗi.',

    // Density selector toolbar button text
    toolbarDensity: 'Tỉ trọng',
    toolbarDensityLabel: 'Tỉ trọng',
    toolbarDensityCompact: 'Gọn nhẹ',
    toolbarDensityStandard: 'Tiêu chuẩn',
    toolbarDensityComfortable: 'Thoải mái',

    // Columns selector toolbar button text
    toolbarColumns: 'Cột',
    toolbarColumnsLabel: 'Chọn cột',

    // Filters toolbar button text
    toolbarFilters: 'Bộ lọc',
    toolbarFiltersLabel: 'Hiển thị bộ lọc',
    toolbarFiltersTooltipHide: 'Ẩn bộ lọc',
    toolbarFiltersTooltipShow: 'Hiển thị bộ lọc',
    toolbarFiltersTooltipActive: (count) => (count !== 1 ? `${count} bộ lọc hoạt động` : `${count} bộ lọc hoạt động`),

    // Export selector toolbar button text
    toolbarExport: 'Export',
    toolbarExportLabel: 'Export',
    toolbarExportCSV: 'Tải xuống dạng CSV',
    toolbarExportPrint: 'In',

    // Columns panel text
    columnsPanelTextFieldLabel: 'Tìm cột',
    columnsPanelTextFieldPlaceholder: 'Tiêu đề cột',
    columnsPanelDragIconLabel: 'Sắp xếp lại cột',
    columnsPanelShowAllButton: 'Hiển thị tất cả',
    columnsPanelHideAllButton: 'Ẩn tất cả',

    // Filter panel text
    filterPanelAddFilter: 'Thêm bọ lọc',
    filterPanelDeleteIconLabel: 'Xóa',
    filterPanelOperators: 'Điều Hành',
    filterPanelOperatorAnd: 'Và',
    filterPanelOperatorOr: 'Hoặc',
    filterPanelColumns: 'Cột',
    filterPanelInputLabel: 'Giá trị',
    filterPanelInputPlaceholder: 'Tìm kiếm giá trị',

    // Filter operators text
    filterOperatorContains: 'chứa',
    filterOperatorEquals: 'bằng',
    filterOperatorStartsWith: 'bắt đầu với',
    filterOperatorEndsWith: 'kết thúc với',
    filterOperatorIs: 'là',
    filterOperatorNot: 'không phải là',
    filterOperatorAfter: 'là sau',
    filterOperatorOnOrAfter: 'là trên hoặc sau',
    filterOperatorBefore: 'là trước',
    filterOperatorOnOrBefore: 'là trên hoặc trước',
    filterOperatorIsEmpty: 'trống rỗng',
    filterOperatorIsNotEmpty: 'không có sản phẩm nào',

    // Filter values text
    filterValueAny: 'bất kì',
    filterValueTrue: 'đúng',
    filterValueFalse: 'sai',

    // Column menu text
    columnMenuLabel: 'Menu',
    columnMenuShowColumns: 'Hiển thị cột',
    columnMenuFilter: 'Bộ lọc',
    columnMenuHideColumn: 'Ẩn',
    columnMenuUnsort: 'Bỏ sắp xếp',
    columnMenuSortAsc: 'Sắp xếp tăng dần',
    columnMenuSortDesc: 'Sắp xếp giảm dần',

    // Column header text
    columnHeaderFiltersTooltipActive: (count) =>
        count !== 1 ? `${count} bộ lọc hoạt động` : `${count} bộ lọc hoạt động`,
    columnHeaderFiltersLabel: 'Hiển thị bộ lọc',
    columnHeaderSortIconLabel: 'Sắp xếp',

    // Rows selected footer text
    footerRowSelected: (count) =>
        count !== 1 ? `${count.toLocaleString()} dòng được chọn` : `${count.toLocaleString()} dòng được chọn`,

    // Total rows footer text
    footerTotalRows: 'Tống số dòng:',

    // Total visible rows footer text
    footerTotalVisibleRows: (visibleCount, totalCount) =>
        `${visibleCount.toLocaleString()} của ${totalCount.toLocaleString()}`,

    // Checkbox selection text
    checkboxSelectionHeaderName: 'Lựa chọn hộp kiểm',

    // Boolean cell text
    booleanCellTrueLabel: 'Đúng',
    booleanCellFalseLabel: 'Sai',

    // Actions cell more text
    actionsCellMore: 'hơn',

    // Column pinning text
    pinToLeft: 'Ghim sang trái',
    pinToRight: 'Ghim sang phải',
    unpin: 'Bỏ ghim',

    // Tree Data
    treeDataGroupingHeaderName: 'Nhóm',
    treeDataExpand: 'see children',
    treeDataCollapse: 'hide children',

    // Grouping columns
    groupingColumnHeaderName: 'Group',
    groupColumn: (name) => `Group by ${name}`,
    unGroupColumn: (name) => `Stop grouping by ${name}`,

    // Used core components translation keys
    MuiTablePagination: {},
};
