import { Transform } from "stream";

export class Liner extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, _, done) {
    let data = chunk.toString();

    if (this._lastLineData) {
      data = this._lastLineData + data;
    }

    let lines = data.split("\n");
    this._lastLineData = lines.splice(lines.length - 1, 1)[0];

    lines.forEach(this.push.bind(this));

    done();
  }

  _flush(done) {
    if (this._lastLineData) {
      this.push(this._lastLineData);
    }

    this._lastLineData = null;

    done();
  }
}
