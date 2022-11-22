# API Performace - K6

### Getting Started
```
1. git clone https://github.com/sadabnepal/APIPerformaceTestingK6.git
2. Navigate to APIPerformaceTestingK6
```

### Pre-requisite
[![K6](https://img.shields.io/badge/-K6-FFFFFF?logo=k6)](https://k6.io/docs/get-started/installation/)
[![NodeJs](https://img.shields.io/badge/-NodeJS-%23339933?logo=npm)](https://nodejs.org/en/download/)
[![VSCode](https://img.shields.io/badge/-Visual%20Studio%20Code-%233178C6?logo=visual-studio-code)](https://code.visualstudio.com/download)

### Run Test commands
```
npm run testGetCall
npm run testPostCall
npm run testPutCall
npm run testPatchCall
npm run testWithVirtualUsers
npm run test
```

### Sample Report:
```
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: tests/getCall.js
     output: -

  scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
           * default: 10 looping VUs for 10s (gracefulStop: 30s)


running (10.5s), 00/10 VUs, 100 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  10s

     ✓ is total record count

     checks.........................: 100.00% ✓ 100     ✗ 0
     data_received..................: 168 kB  16 kB/s
     data_sent......................: 8.6 kB  815 B/s
     http_req_blocked...............: avg=13.43ms  min=0s      med=0s       max=135.46ms p(90)=13.33ms  p(95)=134.36ms 
     http_req_connecting............: avg=2.21ms   min=0s      med=0s       max=23.37ms  p(90)=2.14ms   p(95)=21.46ms  
     http_req_duration..............: avg=32.11ms  min=25.29ms med=31.06ms  max=55.56ms  p(90)=36.57ms  p(95)=40.06ms  
       { expected_response:true }...: avg=32.11ms  min=25.29ms med=31.06ms  max=55.56ms  p(90)=36.57ms  p(95)=40.06ms  
     http_req_failed................: 0.00%   ✓ 0       ✗ 100
     http_req_receiving.............: avg=376.89µs min=0s      med=155.35µs max=6.94ms   p(90)=971.54µs p(95)=1.07ms   
     http_req_sending...............: avg=210.66µs min=0s      med=0s       max=804.6µs  p(90)=601.19µs p(95)=637.8µs  
     http_req_tls_handshaking.......: avg=8.88ms   min=0s      med=0s       max=90.78ms  p(90)=8.71ms   p(95)=88.56ms  
     http_req_waiting...............: avg=31.52ms  min=24.78ms med=30.27ms  max=55.08ms  p(90)=36.29ms  p(95)=39.44ms  
     http_reqs......................: 100     9.48196/s
     iteration_duration.............: avg=1.05s    min=1.02s   med=1.04s    max=1.17s    p(90)=1.07s    p(95)=1.17s    
     iterations.....................: 100     9.48196/s
     vus............................: 10      min=10    max=10
     vus_max........................: 10      min=10    max=10
```