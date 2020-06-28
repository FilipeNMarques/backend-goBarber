import IParserTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTempleteProvider {
  parse(data: IParserTemplateDTO): Promise<string>;
}
