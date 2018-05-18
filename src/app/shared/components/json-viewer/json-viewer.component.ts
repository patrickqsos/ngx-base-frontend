import {Component, Input, OnChanges} from '@angular/core';

export interface Item {
  key: string;
  value: any;
  title: string;
  type: string;
  isOpened: boolean;
}

@Component({
  selector: 'shared-json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.css']
})
export class JsonViewerComponent implements OnChanges {

  @Input()
  json: Array<any> | Object | any;

  @Input()
  maxCollapsedLength: number;

  @Input()
  expandAll: false;

  public asset: Array<Item> = [];

  constructor() { }

  ngOnChanges() {

    if (typeof (this.json) !== 'object' && !Array.isArray(this.json)) {

      if (this.json) {
        const msg = this.json;

        this.json = {
          Mensaje: msg
        };
      } else {
        return;
      }
    }

    this.asset = [];

    Object.keys(this.json).forEach((key) => {
      this.asset.push(this.createItem(key, this.json[key]));
    });

    if (this.expandAll) {
      this.asset.forEach(element => {
        this.clickHandle(element);
      });
    }
  }


  private createItem(key: any, value: any): Item {
    const item: Item = {
      key: key || '""',
      value: value,
      title: value,
      type: undefined,
      isOpened: false
    };

    if (typeof (item.value) === 'string') {
      item.type = 'string';
      item.title = `"${item.value}"`;

    } else if (typeof (item.value) === 'number') {
      item.type = 'number';

    } else if (typeof (item.value) === 'boolean') {
      item.type = 'boolean';

    } else if (item.value instanceof Date) {
      item.type = 'date';

    } else if (typeof (item.value) === 'function') {
      item.type = 'function';

    } else if (Array.isArray(item.value)) {
      item.type = 'array';
      item.title = `Array[${item.value.length}] ${JSON.stringify(item.value)}`;

    } else if (item.value === null) {
      item.type = 'null';
      item.title = 'null';

    } else if (typeof (item.value) === 'object') {
      item.type = 'object';
      item.title = `Object ${JSON.stringify(item.value)}`;

    } else if (item.value === undefined) {
      item.type = 'undefined';
      item.title = 'undefined';
    }

    item.title = this.setMaxLength('' + item.title);


    return item;
  }

  isObject(item: Item): boolean {
    return ['object', 'array'].indexOf(item.type) !== -1;
  }

  clickHandle(item: Item) {
    if (!this.isObject(item)) {
      return;
    }
    item.isOpened = !item.isOpened;
  }

  setMaxLength(str: string) {
    if (!this.maxCollapsedLength || str.length < this.maxCollapsedLength) {
      return str;
    }
    return str.substring(0, this.maxCollapsedLength) + '...';
  }
}
