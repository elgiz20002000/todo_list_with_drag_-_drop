
    export function autoBind(_1: any, _2: string, descriptor: PropertyDescriptor) {
      console.log(_1);
      console.log(_2);
      
        let originalMethod = descriptor.value;
        let adcDescriptor: PropertyDescriptor = {
          configurable: true,
          get() {
            let bindedFunction = originalMethod.bind(this);
            return bindedFunction;
          },
        };
        return adcDescriptor;
      }
