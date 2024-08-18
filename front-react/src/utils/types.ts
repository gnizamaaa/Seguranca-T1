// types.ts

export type Notice = {
	index: number;
	input: {
	  index: number;
	};
	payload: string;
      };
      
      export type Report = {
	index: number;
	input: {
	  index: number;
	};
	payload: string;
      };
      
      export type Voucher = {
	index: number;
	input: {
	  index: number;
	};
	destination: string;
	payload: string;
      };
      
      export type GraphQLResponse<T> = {
	data: T;
      };