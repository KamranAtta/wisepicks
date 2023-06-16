/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { useNavigate } from 'react-router-dom';
import React, { Fragment, useState, FormEvent } from 'react';
import {
  PlusOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import SearchBar from '../../components/common/Search';
import ButtonLayout from '../../components/ButtonLayout';
import TypographyTitle from '../../components/common/Title';
import ButtonComponent from '../../components/common/Button';
import ProjectTable from '../../components/Table/ProjectTable';
import ProjectDetail from '../../components/Drawer/ProjectDetail';
import { ProjectListDataType } from '../../components/Drawer/ProjectDetail/interfaces/projectListInterface';
import { ProjectQuery } from '../../components/Table/ProjectTable/interfaces/ProjectQueryInterface';
import { PROJECT_QUERY_INITIAL } from '../../utils/constant';

export default function ProjectList() {
  const navigation = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [projectQuery, setProjectQuery] = useState<ProjectQuery>(PROJECT_QUERY_INITIAL);
  const [projDetailOpen, setProjectDetailOpen] = useState<boolean>(false);
  const [projectDetail, setProjectDetail] = useState<ProjectListDataType>();

  const handleKeyPress = () => {
    submitSearchInput();
  };
  const handleSearchQueryChange = (event: FormEvent<HTMLElement>) => {
    setSearchQuery((event.target as HTMLInputElement).value);
  };

  const handleProjectQueryChange = (status: string) => {
    setProjectQuery((prev) => ({ ...prev, status }));
  };

  const submitSearchInput = async () => {
    setProjectQuery((prev) => ({
      query: {
        page: 1,
        pageSize: 10,
        searchQuery,
      },
      status: prev.status,
    }));
  };

  const handleResetSearchQuery = () => {
    setProjectQuery(PROJECT_QUERY_INITIAL);
  };

  const handleProjectDetailOpen = (element: ProjectListDataType) => {
    setProjectDetail(element);
    setProjectDetailOpen(true);
  };

  return (
    <Fragment>
      <div className='component-content'>
        <ButtonLayout
          title={
            <TypographyTitle level={3} style={{ marginTop: '0px', marginBottom: '0px' }}>
              Project
            </TypographyTitle>
          }
          left={[
            {
              children: 'Under Allocated',
              props: {
                icon: <WarningOutlined style={{ color: 'orange' }} />,
                onClick: () => handleProjectQueryChange('underUtilized'),
              },
            },
            {
              children: 'Over Allocated',
              props: {
                icon: <QuestionCircleOutlined style={{ color: 'red' }} />,
                onClick: () => handleProjectQueryChange('overUtilized'),
              },
            },
            {
              children: 'Normal',
              props: {
                icon: <CheckCircleOutlined style={{ color: 'green' }} />,
                onClick: () => handleProjectQueryChange('normal'),
              },
            },
          ]}
          right={[
            {
              children: 'Clear Filters',
              props: {
                onClick: () => handleResetSearchQuery(),
              },
            },
            {
              children: 'Add Project',
              props: {
                type: 'primary',
                icon: <PlusOutlined />,
                onClick: () => navigation('/add-project'),
              },
            },
          ]}
        />
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <SearchBar
            value={searchQuery}
            onChange={(e: FormEvent<HTMLElement>) => handleSearchQueryChange(e)}
            onPressEnter={handleKeyPress}
          />
          <ButtonComponent type='primary' onClick={submitSearchInput}>
            Search
          </ButtonComponent>
        </div>
        <ProjectTable
          projectQuery={projectQuery}
          handleProjectDetail={(element: ProjectListDataType) => handleProjectDetailOpen(element)}
        />
        {projDetailOpen && (
          <ProjectDetail
            title='Project Details'
            onClose={() => setProjectDetailOpen(false)}
            open={projDetailOpen}
            data={projectDetail as ProjectListDataType}
          />
        )}
      </div>
    </Fragment>
  );
}
