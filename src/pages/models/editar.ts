export interface EditarDTO {
    login_usuario: string;
    nome: string;
    cpf: string;
    faixa_salarial: string;
    data_nascimento: string;
    endereco: {
       login_usuario: string;
        rua: string;
        complemento: string;
        bairro: string;
        cidade: string;
        cep: string;
        estado: string;
    }
}