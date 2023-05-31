import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataTableProps {
  loading: boolean;
  columns: ColumnsType<object>;
  data: readonly object[];
}

const DataTable = ({ columns, data, loading }: DataTableProps) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{ x: 'max-content' }}
      bordered
      loading={loading}
    />
  );
};

export default DataTable;
