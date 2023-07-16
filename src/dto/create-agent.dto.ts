
type City = {
  value: string;
  label: string;
};

export class CreateAgentDto {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  phone: string;
  agentType: string;
  region: string;
  // city: City;
  // terms: boolean;
}
