import { createWriteStream, writeFileSync, WriteStream } from "fs";

interface IConfigTitle {
  description: string;
  value: string | string[]
}
export interface IPZConfig {
  [title:string]: IConfigTitle;
}

class PZConfigService {
  public settings = {};
  private LIST_KEYS = ['Mods', 'Map', 'WorkshopItems'];

  public parseConfig(config: string) {
    const lines = config.split(/\r?\n/).filter(el => el);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      let description: string, key: string, value: string | string[];
      if (line === '' || line === undefined) {
         continue;
      }
      if (line[0] === '#') {
        // comment/description
        description = line.slice(1).trim();
        i++;
        while(lines[i] && lines[i].startsWith('#')) {
          description = `${description}\n${lines[i].slice(1).trim()}`;
          i++;
        }
        if (!lines[i]) continue;
      }
      const parsedLine = lines[i].split('=');
      key = parsedLine[0];
      if (this.LIST_KEYS.includes(key)) {
        //list value
        value = parsedLine[1].split(';').filter(el => el);
      } else {
        value = parsedLine[1];
      }
      this.settings[key] = {
        description,
        value,
      };
    }
    return this.settings;
  }

  public writePayload(config: IPZConfig, filepath: string) {
    let doc = '';

    Object.keys(config).map(title => {
      let description = config[title].description;
      if (description && description.includes('\n')) {
        let lines = description.split('\n');
        description = '';
        lines.forEach(line => {
          description = description.concat(`#${line}\r\n`);
        });
      } else {
        description = description ? `#${description}` : '';
      }
      let value: string = '';

      if (!Array.isArray(config[title].value)){
        value = config[title].value as string;
      } else {
        (config[title].value as []).forEach(item => {
          value = value.concat(`${item};`);
        });
      }
      doc = doc.concat(`${description}\n${title}=${value}\n\n`)
    });
    if (doc === '') {
      throw Error(`Config payload is empty!`);
    }
    writeFileSync(filepath, doc);
  }
}

export default PZConfigService;