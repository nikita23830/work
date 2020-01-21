import { TIMING } from '../MainTable/tools'

export const checkBreakList = (data) => {
  let result = []
  let minuts = ['5 минут', '10 минут', '15 минут']
  let check = -1
  let start = -1
  data.map(i => {
    switch (i.start_end) {
      case 0: { check++; result[start][2].push(i.timing_id); return 0 }
      case 1: { check = 0; result.push([`${TIMING[i.timing_id][1]}:${TIMING[i.timing_id][2]}`, undefined, [i.timing_id]]); start = result.length - 1; return 0 }
      case 2: { result[start][1] = minuts[check+1]; result[start][2].push(i.timing_id); return 0 }
      case 3: { result.push([`${TIMING[i.timing_id][1]}:${TIMING[i.timing_id][2]}`, minuts[0], [i.timing_id]]); return 0 }
    }
  })
  result = result.sort(function(a, b) {
    return parseFloat(a[0]) - parseFloat(b[0]);
  });
  return result
}
