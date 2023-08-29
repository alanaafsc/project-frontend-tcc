'use client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Table, Tag, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';

const columns = [
  {
    title: 'Fases',
    dataIndex: 'fases',
    key: 'fases',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Descrição',
    dataIndex: 'descricao',
    key: 'descricao',
  },
  {
    title: 'Atividades',
    dataIndex: 'atividades',
    key: 'atividades',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      let color;
      if (status === 'Concluído') {
        color = 'green';
      } else if (status === 'Em andamento') {
        color = 'yellow';
      } else if (status === 'Atrasado') {
        color = 'red';
      } else {
        color = 'default'; // Cor padrão para outros estados
      }

      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: 'Ações',
    dataIndex: 'actions',
    key: 'actions',
    render: () => (
      <div>
        <Button
          type="text"
          size="small"
          icon={<EditOutlined />}
          style={{ marginRight: 8 }}
        >
          Editar
        </Button>
        <Button
          type="text"
          size="small"
          icon={<DeleteOutlined />}
        >
          Excluir
        </Button>
      </div>
    ),
  },
];

const data = [
  {
    key: '1',
    fases: 'Projeto Informacional',
    descricao: 'Projeto de desenvolvimento  de software',
    atividades: 'atividade',
    status: 'Em andamento',
  },
  {
    key: '2',
    fases: 'Projeto Detalhado',
    descricao: 'Projeto de desenvolvimento',
    atividades: 'atividade',
    status: 'Concluído',
  },
  {
    key: '3',
    fases: 'Projeto Conceitual',
    descricao: 'Projeto de desenvolvimento  de software',
    atividades: 'atividade',
    status: 'Atrasado',
  },
];
const TableLayout = () => <Table columns={columns} dataSource={data} style={{ width: '990px' }} />;
export default TableLayout;