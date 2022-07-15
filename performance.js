function calculateLoadTimes() {
  // 判断是否支持 performance
  if (performance === undefined) {
    console.log("= Calculate Load Times: performance NOT supported");
    return;
  }

  // 获取 "resource" 类型 performance entries 列表
  var resources = performance.getEntriesByType("resource");
  if (resources === undefined || resources.length <= 0) {
    console.log("= Calculate Load Times: there are NO `resource` performance records");
    return;
  }

  console.log("= Calculate Load Times");
  for (var i=0; i < resources.length; i++) {
    console.log("== Resource[" + i + "] - " + resources[i].name);
    // 重定向时间
    var t = resources[i].redirectEnd - resources[i].redirectStart;
    console.log("... Redirect time = " + t);

    // DNS 时间
    t = resources[i].domainLookupEnd - resources[i].domainLookupStart;
    console.log("... DNS lookup time = " + t);

    // TCP 握手时间
    t = resources[i].connectEnd - resources[i].connectStart;
    console.log("... TCP time = " + t);

    // 可靠连接时间
    t = (resources[i].secureConnectionStart > 0) ? (resources[i].connectEnd - resources[i].secureConnectionStart) : "0";
    console.log("... Secure connection time = " + t);

    // 响应时间
    t = resources[i].responseEnd - resources[i].responseStart;
    console.log("... Response time = " + t);

    // fetchStart 直到响应结束    
    t = (resources[i].fetchStart > 0) ? (resources[i].responseEnd - resources[i].fetchStart) : "0";
    console.log("... Fetch until response end time = " + t);

    // 请求开始到响应结束
    t = (resources[i].requestStart > 0) ? (resources[i].responseEnd - resources[i].requestStart) : "0";
    console.log("... Request start until response end time = " + t);

    // Start 直到响应结束 
    t = (resources[i].startTime > 0) ? (resources[i].responseEnd - resources[i].startTime) : "0";
    console.log("... Start until response end time = " + t);
  }
}

function setResourceTimingBufferSize(maxSize) {
  if (performance === undefined) {
     console.log("Browser does not support Web Performance");
    return;
  }
  var supported = typeof performance.setResourceTimingBufferSize == "function";
  if (supported) {
     console.log("... Performance.setResourceTimingBufferSize() = Yes");
    //设置浏览器性能测量缓冲区中 可维持的resource 类型 entry 对象的最大数量
    //通常不低于150
    performance.setResourceTimingBufferSize(maxSize);
  } else {
     console.log("... Performance.setResourceTimingBufferSize() = NOT supported");
  }
}

setResourceTimingBufferSize(256)

calculateLoadTimes()

//删除所有  resource 类型 entry 
performance.clearResourceTimings()
