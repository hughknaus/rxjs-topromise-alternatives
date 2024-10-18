"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const subject = new rxjs_1.Subject();
const obs = subject.asObservable();
let counter = 0;
// THIS WORKS AND IS A PURE OBSERVABLE APPROACH:
const emitValues = obs
    .pipe((0, operators_1.tap)((value) => console.log(`Tap value:`, value)), // Logs every emitted value during the subscription
(0, operators_1.last)(), // This controls the "next" value of the subsribe (i.e. the last value in this case)
(0, operators_1.switchMap)((value) => {
    console.log(`SwitchMap value:`, value);
    return (0, rxjs_1.of)(value);
}))
    .subscribe();
// THIS WORKS BUT .toPromise() WILL BE DEPCRECATED IN rxjs@8.0.0:
// subject
//   .toPromise()
//   .then((value) => {
//     console.log('Promise Received:', value);
//   })
//   .catch((err) => {
//     console.error('Promise Error:', err);
//   })
//   .finally(() => {
//     console.log('Promise Finally');
//   });
// THIS WORKS AND IS THE SUGGESTED REPLACEMENT OF .toPromise() (SEE: https://rxjs.dev/deprecations/to-promise):
// lastValueFrom(subject)
//   .then((value) => {
//     console.log('lvf Promise Received:', value);
//   })
//   .catch((err) => {
//     console.error('lvf Promise Error:', err);
//   })
//   .finally(() => {
//     console.log('lvf Promise Finally');
//   });
// Start emitting values to the subject every 2 seconds and will continue emitting after subscription completes
let intervalId = setInterval(() => {
    if (counter >= 10) {
        // stop after 10 executions
        clearInterval(intervalId);
    }
    let counterX = counter++;
    console.log(`Emit to subject:`, counterX);
    subject.next(counterX);
}, 2000);
// Manually stop emitting values after a certain time (e.g., 10 seconds)
setTimeout(() => {
    console.log(`Stopping any subscriptions...`);
    subject.complete(); // Complete the observable
    /*
      Automatic Unsubscription: When a Subject completes, its subscribers are automatically unsubscribed. This behavior is defined in the RxJS library. As stated in the search results:
      - “When you call complete on the subject, any subscribers will be automatically unsubscribed.”
      - “If an observable completes, any subscription to it will automatically be unsubscribed.”
    
      Explicit Unsubscription: However, if you need to explicitly manage subscriptions, you can use the `takeUntil` operator or other methods. Here are some approaches:
        - Using takeUntil: You can use takeUntil with a Subject that emits a value when you want to unsubscribe. For example:
          
        subject$.pipe(takeUntil(unsubscribeSubject$)).subscribe(() => {
            // code to execute when subject completes
          });
    */
}, 10000);
