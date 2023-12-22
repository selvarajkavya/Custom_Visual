"use strict";

import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import DataView = powerbi.DataView;
import IVisualHost = powerbi.extensibility.IVisualHost;
import * as d3 from "d3";
type Selection<T extends d3.BaseType> = d3.Selection<T, any, any, any>;

export class Visual implements IVisual {
  private host: IVisualHost;
  private svg: Selection<SVGElement>;
  private container: Selection<SVGElement>;
  private circle: Selection<SVGElement>;
  private textValue: Selection<SVGElement>;
  private textLabel: Selection<SVGElement>;

  constructor(options: VisualConstructorOptions) {
    this.svg = d3
      .select(options.element)
      .append("svg")
      .classed("circleCard", true);
    this.container = this.svg.append("g").classed("container", true);
    this.circle = this.container.append("circle").classed("circle", true);
    this.textValue = this.container.append("text").classed("textValue", true);
    this.textLabel = this.container.append("text").classed("textLabel", true);
  }

  public update(options: VisualUpdateOptions) {
    const dataView: DataView = options.dataViews[0];
    const width: number = options.viewport.width;
    const height: number = options.viewport.height;
    this.svg.attr("width", width);
    this.svg.attr("height", height);
    const radius: number = Math.min(width, height) / 2.2;
    this.circle
      .style("fill", "white")
      .style("fill-opacity", 0.5)
      .style("stroke", "black")
      .style("stroke-width", 2)
      .attr("r", radius)
      .attr("cx", width / 2)
      .attr("cy", height / 2);
    const fontSizeValue: number = Math.min(width, height) / 5;
    this.textValue
      .text(<string>dataView.single.value)
      .attr("x", "50%")
      .attr("y", "50%")
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .style("font-size", fontSizeValue + "px");
    const fontSizeLabel: number = fontSizeValue / 4;
    this.textLabel
      .text(dataView.metadata.columns[0].displayName)
      .attr("x", "50%")
      .attr("y", height / 2)
      .attr("dy", fontSizeValue / 1.2)
      .attr("text-anchor", "middle")
      .style("font-size", fontSizeLabel + "px");
  }
}
