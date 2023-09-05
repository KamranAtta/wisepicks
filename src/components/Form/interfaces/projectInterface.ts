export interface project {
  name: string;
  client_id: string;
  project_type: string;
  start_date: object;
  end_date: Date;
  expected_start_date: Date;
  expected_end_date: Date;
  project_resources: [
    {
      team_id: string;
      skills: string[];
      level: string;
      start_date: Date;
      end_date: Date;
      expected_start_date: Date;
      expected_end_date: Date;
      fte: number;
    },
  ];
  domains: string[];
}
