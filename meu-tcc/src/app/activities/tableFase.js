import React from 'react';
import { Card, Collapse, Tag } from 'antd';

const { Panel } = Collapse;

const text = (
  <p>
    A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
    as a welcome guest in many households across the world.
  </p>
);

const CustomCard = ({ title, color, subtitle, children }) => (
  <Card
    title={title}
    bordered={false}
    style={{
      width: '100%',
    }}
  >
    <Tag color={color}>{subtitle}</Tag>
    <h2>{title}</h2>
    <Collapse size="small" style={{ width: '100%' }}>
      <Panel header="Descrição">{text}</Panel>
    </Collapse>
  </Card>
);

export default function TableFase() {
  return (
    <CustomCard title="Fase atual" color="#f50" subtitle="Projeto Informacional">
      {text}
    </CustomCard>
  );
}
