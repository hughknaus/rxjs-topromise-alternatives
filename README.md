# rxjs-observable-topromise-alternatives

RxJS is deprecating .toPromise() in version 8.0. This an example of RxJS .toPromise() alternatives using:

1. pure Observable/Subscription,
2. firstValueFrom or lastValueFrom (implemnted primarily the same).

Also to note:

    Automatic Unsubscription: When a Subject completes, its subscribers are automatically unsubscribed. This behavior is defined in the RxJS library. As stated in the search results:
    - “When you call complete on the subject, any subscribers will be automatically unsubscribed.”
    - “If an observable completes, any subscription to it will automatically be unsubscribed.”

    Explicit Unsubscription: However, if you need to explicitly manage subscriptions, you can use the `takeUntil` operator or other methods. Here are some approaches:
      - Using takeUntil: You can use takeUntil with a Subject that emits a value when you want to unsubscribe. For example:

      subject$.pipe(takeUntil(unsubscribeSubject$)).subscribe(() => {
          // code to execute when subject completes
        });

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/hughknaus/rxjs-observable-topromise-alternatives)
