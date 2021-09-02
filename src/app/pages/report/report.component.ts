import {  Component, ViewChild, AfterViewInit } from '@angular/core';
import { DxPivotGridComponent, DxChartComponent } from 'devextreme-angular';
import { Order } from 'src/app/core/models/order';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements AfterViewInit {

  @ViewChild(DxPivotGridComponent, { static: false }) pivotGrid: DxPivotGridComponent;
  @ViewChild(DxChartComponent, { static: false }) chart: DxChartComponent;
  orders= new Array<any>();
  pivotGridDataSource: any;

  constructor(private orderService: OrderService) {

  }

  ngAfterViewInit() {
    this.orderService.getOrderSucursal('buttymanager').then(res=>{
      for (let order of res) {

        var ord = {
          orderAgency: order.attributes.orderAgency,
          state: order.attributes.state,
          orderProvince: order.attributes.orderProvince,
          orderMunicipio: order.attributes.orderMunicipio,
          createdAt: order.attributes.createdAt,
          orderUSD: order.attributes.orderAmount,
          ordermn: 0
        }
        if(order.attributes.orderCurrency == 'Moneda Nacional(MN)'){
          ord.orderUSD = 0;
          ord.ordermn = order.attributes.orderAmount
        }

        this.orders.push(ord);
      }
      this.pivotGridDataSource = {
        fields: [{
          caption: "Agencia",
          width: 120,
          dataField: "orderAgency",
          area: "row",
          sortBySummaryField: "Total"
        }, {
          caption: "Estado",
          dataField: "state",
          width: 150,
          area: "row"
        },
        {
          caption: "Provincia",
          width: 120,
          dataField: "orderProvince",
          area: "row",
        }, {
          caption: "Municipio",
          dataField: "orderMunicipio",
          width: 150,
          area: "row"
        },{
          dataField: "createdAt",
          dataType: "date",
          area: "column"
        },{
          groupName: "date",
          groupInterval: "month",
          visible: false
        },{
          caption: "Cantidad de Ordenes",
          summaryType: "count",
          area: "data"
        },{
          caption: "Total(MN)",
          dataField: "ordermn",
          dataType: "number",
          summaryType: "sum",
          format: "currency",
          area: "data"
        },{
          caption: "Total(USD)",
          dataField: "orderUSD",
          dataType: "number",
          summaryType: "sum",
          format: "currency",
          area: "data"
        }],
        store: this.orders
      }
    });
    this.pivotGrid.instance.bindChart(this.chart.instance, {
      dataFieldsDisplayMode: "splitPanes",
      alternateDataFields: false
    });

    setTimeout(() => {
        var dataSource = this.pivotGrid.instance.getDataSource();

    }, 0);
  }

  // customizeTooltip(args:any) {
  //   return {
  //     html: args.seriesName + " | Total<div class='currency'>" + args.valueText + "</div>"
  //   };
  // }
}
