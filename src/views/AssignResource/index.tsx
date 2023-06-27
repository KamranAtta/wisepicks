/* eslint-disable no-console */
import StepsComponent from '../../components/Steps';
import ProjectResourcesTable from '../../components/Table/ProjectResourcesTable';
import { ProjectResourceQueryI } from '../../components/Table/ProjectResourcesTable/interface';

export default function AssignResource() {
  const styles = {
    pageStyle: {
      padding: '3em',
    },
  };
  const urlParams = new URLSearchParams(window.location.search);
  const projectId: string | null = urlParams.get('id');
  const RESOURCE_QUERY_INITIAL: ProjectResourceQueryI = { query: '', status: '' };
  return (
    <div style={styles.pageStyle}>
      <ProjectResourcesTable resourceQuery={RESOURCE_QUERY_INITIAL}></ProjectResourcesTable>
      <StepsComponent id={projectId}></StepsComponent>
    </div>
  );
}
