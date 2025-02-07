

export interface Bill {
  title: string;
  amount: number;
  category: string;
  dueDate: string;
  urgent: boolean;
  important: boolean;
}

export interface Pokemon {
  name:string
  weight:number
  abilities:Abilities[]
}

interface Abilities{
  ability:Ability
  is_hidden:boolean
  slot:number
}

interface Ability{
  name:string
}
