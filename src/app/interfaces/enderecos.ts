export interface Enderecos{
    created_at?: string;
    id?: number;
    cep: string;
    rua: string;
    numero: number;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    update_at?:string;
}