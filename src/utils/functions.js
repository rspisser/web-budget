import Configuration from "@/utils/configuration";
import numeral from "@/utils/numeralCustomizations";
import { scaleThreshold } from "d3";

export function fillColor(val) {
  const colorScale = scaleThreshold()
    .domain([-0.25, -0.05, 0, 0.05, 0.25])
    /* 0  .range(["#D84B2A", "#EE9586", "#E4B7B2", "#BECCAE", "#9CAF84", "#7AA25C"]); */
    /* 1 .range(["#c51b7d", "#e9a3c9", "#fde0ef", "#e6f5d0", "#a1d76a", "#4d9221"]); */
    /* 2 .range(["#b2182b", "#ef8a62", "#fddbc7", "#d1e5f0", "#67a9cf", "#2166ac"]); */
    /* 3 .range(["#d73027", "#fc8d59", "#fee08b", "#d9ef8b", "#91cf60", "#1a9850"]); */
    /* -1 .range(["#f0f9e8", "#ccebc5", "#a8ddb5", "#7bccc4", "#43a2ca", "#0868ac"]); */
    /*  4.range(["#762a83", "#af8dc3", "#e7d4e8", "#d9f0d3", "#7fbf7b", "#1b7837"]); */
    .range(["#762a83", "#af8dc3", "#e7d4e8", "#b8e2ae", "#6cb366", "#1b7837"]);

  if (isFinite(val)) {
    return colorScale(val);
  }
  return "#AAAAAA";
}

export function calcCenterOfBlocks(childNodes) {
  let centers = [];
  let offset = 24;
  for (const key in childNodes) {
    if (childNodes.hasOwnProperty(key)) {
      const c = {
        x: childNodes[key].offsetLeft + childNodes[key].offsetWidth / 2,
        y: childNodes[key].offsetTop + childNodes[key].offsetHeight / 2 + offset
      };
      centers.push(c);
    }
    offset = 0;
  }
  return centers;
}

export function filterPassed(d, filters) {
  if (filters.top_partition.length && filters.second_partition.length) {
    return (
      filters.top_partition.includes(d.partitions.top_partition) &&
      filters.second_partition.includes(d.partitions.second_partition)
    );
  }
  if (filters.top_partition.length || filters.second_partition.length) {
    return (
      filters.top_partition.includes(d.partitions.top_partition) ||
      filters.second_partition.includes(d.partitions.second_partition)
    );
  }
  return true;
}

export function computeNewFilteredTotals(partitionLabels, filteredTot) {
  let newPartitionLabels = {};
  /* compute new tot */
  newPartitionLabels.top_partition = partitionLabels.top_partition.map(item => {
    if (filteredTot.top_partition_label[item.top_partition]) {
      item.filteredAmount = filteredTot.top_partition_label[item.top_partition];
    } else {
      item.filteredAmount = 0;
    }
    return item;
  });

  newPartitionLabels.second_partition = partitionLabels.second_partition.map(
    item => {
      if (filteredTot.second_partition_label[item.second_partition]) {
        item.filteredAmount =
          filteredTot.second_partition_label[item.second_partition];
      } else {
        item.filteredAmount = 0;
      }
      return item;
    }
  );
  return newPartitionLabels;
}

//----------------------------------------------------------
// FORMATTING
const amountFormat = Configuration().current().amountFormat;
export function formatAmount(amount) {
  let amt = Number(amount);
  if (isFinite(amt)) {
    return numeral(amt).format(amountFormat);
  }
  return "N/A";
}
const rateFormat = Configuration().current().rateFormat;
export function formatRate(amt) {
  if (isFinite(amt)) {
    return numeral(amt).format(rateFormat);
  }
  return "N/A";
}
