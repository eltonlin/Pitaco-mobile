export interface QuestionarioDTO {
    id_questionario: string;
    login_usuario: string;
    descricao_questionario: string;
    pontuacao_questionario: number;
    tipo_pergunta: string;
    opcoes: any[];
    /*opcoes:{
        descricao_opcao: string;
        id_opcao:string;
        id_pergunta:string;
    }*/

}