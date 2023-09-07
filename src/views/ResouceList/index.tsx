import React, { Fragment, useState, FormEvent } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import SearchBar from '../../components/common/Search';
import ButtonLayout from '../../components/ButtonLayout';
import TypographyTitle from '../../components/common/Title';
import ButtonComponent from '../../components/common/Button';
import ResourceTable from '../../components/Table/ResourceTable';
import ResourceDetail from '../../components/Drawer/ResourceDetail';
import AssignProject from '../../components/Drawer/AssignProject/AssignProject';
import { resourceListDataType as ResourceListDataType } from '../../components/Table/ResourceTable/interfaces/resourceListInterface';
import { ResourceQuery } from '../../components/Table/ResourceTable/interfaces/ResourceQueryInterface';

export default function ResourceList() {
  const navigation = useNavigate();

  const RESOURCE_QUERY_INITIAL = { query: '', status: '' };
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [resourceDrawerOpen, setResourceDrawerOpen] = useState<boolean>(false);
  const [assignProjectDrawerOpen, setAssignProjectDrawerOpen] = useState<boolean>(false);
  const [resourceQuery, setResourceQuery] = useState<ResourceQuery>(RESOURCE_QUERY_INITIAL);
  const [resourceDetails, setResourceDetails] = useState<ResourceListDataType | null>(null);

  const handleSearchQueryChange = (event: FormEvent<HTMLElement>) => {
    setSearchQuery((event.target as HTMLInputElement).value);
  };

  const submitSearchInput = async () => {
    setResourceQuery((prev) => ({ ...prev, query: searchQuery }));
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
        <ButtonLayout
          title={
            <TypographyTitle level={3} style={{ marginTop: '0px', marginBottom: '0px' }}>
              Resources
            </TypographyTitle>
          }
          left={[]}
          // right={[]}
          right={[
            {
              children: 'Add Resource',
              props: {
                type: 'primary',
                icon: <PlusOutlined />,
                onClick: () => navigation('/add-resource'),
              },
            },
          ]}
        />
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <SearchBar
            value={searchQuery}
            onChange={(e) => handleSearchQueryChange(e)}
            onPressEnter={() => submitSearchInput()}
          />
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
