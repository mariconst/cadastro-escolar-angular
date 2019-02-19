export interface Estudantes{
    created_at?: string;
    id?: number;
    id_endereco?: number;
    id_mae?: number;
    mae?: string;
    
    nome: string;
    nascimento: string;
    serie: number;

    cep: string;
    rua: string;
    numero: number;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    
    cpf: string;
    dia_pagamento: number;
    update_at?:string;
}