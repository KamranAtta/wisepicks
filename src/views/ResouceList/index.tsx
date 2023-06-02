import React, { Fragment, useState, FormEvent } from 'react';
import { CheckCircleOutlined, QuestionCircleOutlined, WarningOutlined } from '@ant-design/icons';

import SearchBar from '../../components/common/Search';
import TypographyTitle from '../../components/common/Title';
import ButtonComponent from '../../components/common/Button';
import ResourceTable from '../../components/Table/ResourceTable';

import './index.css';
import ResourceDetail from '../../components/Drawer/ResourceDetail';
import { resourceListDataType as ResourceListDataType } from '../../components/Table/ResourceTable/interfaces/resourceListInterface';
import AssignProject from '../../components/Drawer/AssignProject/AssignProject';
interface ResourceQuery {
  query: string;
  status: string;
}

export default function ResourceList() {
  const RESOURCE_QUERY_INITIAL = { query: '', status: '' };
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [resourceDrawerOpen, setResourceDrawerOpen] = useState<boolean>(false);
  const [assignProjectDrawerOpen, setAssignProjectDrawerOpen] = useState<boolean>(false);
  const [resourceQuery, setResourceQuery] = useState<ResourceQuery>(RESOURCE_QUERY_INITIAL);
  const [resourceDetails, setResourceDetails] = useState<ResourceListDataType | null>(null);

  const handleSearchQueryChange = (event: FormEvent<HTMLElement>) => {
    setSearchQuery((event.target as HTMLInputElement).value);
  };

  const handleResourceQueryChange = (status: string) => {
    setResourceQuery((prev) => ({ ...prev, status }));
  };

  const submitSearchInput = async () => {
    setResourceQuery((prev) => ({ ...prev, query: searchQuery }));
  };

  const handleResetSearchQuery = () => {
    setResourceQuery(RESOURCE_QUERY_INITIAL);
  };

  const showResourceDrawer =
    (type = 'detail') =>
    (element: ResourceListDataType) => {
      setResourceDetails(element);
      switch (type) {
        case 'detail': {
          setResourceDrawerOpen(true);
          break;
        }
        case 'assign':
          setAssignProjectDrawerOpen(true);
          break;
        default:
          setResourceDrawerOpen(true);
      }
    };

  return (
    <Fragment>
      <div className='component-content'>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1em' }}>
          <div style={{ display: 'flex', alignContent: 'center' }}>
            <TypographyTitle level={3} style={{ marginTop: '0px', marginBottom: '0px' }}>
              Resources
            </TypographyTitle>
            <ButtonComponent
              className='over-allocated-menu-button'
              icon={<QuestionCircleOutlined />}
              onClick={() => handleResourceQueryChange('overUtilized')}
            >
              Over Utilized
            </ButtonComponent>
            <ButtonComponent
              className='under-allocated-menu-button'
              icon={<WarningOutlined />}
              onClick={() => handleResourceQueryChange('underUtilized')}
            >
              Under Utilized
            </ButtonComponent>
            <ButtonComponent
              className='normal-menu-button'
              icon={<CheckCircleOutlined />}
              onClick={() => handleResourceQueryChange('normal')}
            >
              Normal
            </ButtonComponent>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* <MenuDropDown items={menuItems} /> */}
            <ButtonComponent className='clear-menu-button' onClick={() => handleResetSearchQuery()}>
              Clear Filters
            </ButtonComponent>
          </div>
        </div>
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <SearchBar value={searchQuery} onChange={(e) => handleSearchQueryChange(e)} />
          <ButtonComponent type='primary' onClick={submitSearchInput}>
            Search
          </ButtonComponent>
        </div>
        <ResourceTable
          resourceQuery={resourceQuery}
          handleResourceDetail={(element: ResourceListDataType) =>
            showResourceDrawer('detail')(element)
          }
          handleAssignProject={(element: ResourceListDataType) =>
            showResourceDrawer('assign')(element)
          }
        />
      </div>
      {resourceDrawerOpen && (
        <ResourceDetail
          title='Resource Details'
          onClose={() => setResourceDrawerOpen(false)}
          open={resourceDrawerOpen}
          data={resourceDetails as ResourceListDataType}
        />
      )}
      {assignProjectDrawerOpen && (
        <AssignProject
          title='Assign Project'
          open={assignProjectDrawerOpen}
          onClose={() => setAssignProjectDrawerOpen(false)}
          data={resourceDetails as ResourceListDataType}
        />
      )}
    </Fragment>
  );
}
