export default interface projectPlanInterface {
  key: string;
  name: string;
  resources: [{ key: string; team: string; level: string; hoursPercentage: string }];
}
