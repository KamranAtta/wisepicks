import StepsComponent from '../../components/Steps';
import ProjectResourcesTable from '../../components/Table/ProjectResourcesTable';

export default function AssignResource() {
  const styles = {
    pageStyle: {
      padding: '3em',
    },
  };

  const RESOURCE_QUERY_INITIAL = { query: '', status: '' };
  return (
    <div style={styles.pageStyle}>
      <ProjectResourcesTable resourceQuery={RESOURCE_QUERY_INITIAL}></ProjectResourcesTable>
      <StepsComponent id={1}></StepsComponent>
    </div>
  );
}
