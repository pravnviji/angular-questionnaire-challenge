/*import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, getTestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Logger } from 'src/app/core/logger.service';
import { TtariffDetails } from '../model/question';

import { TariffService } from './question.service';

class MockLoggerService {
  log() {
    return of(true);
  }
  debug() {
    return of(true);
  }
}

describe('TariffService', () => {
  let serviceTest: TariffService;
  let httpMock: HttpTestingController;
  let injector: TestBed;
  const dummyTarifDetails: TtariffDetails[] = [
    {
      id: '1',
      name: 'Montana bonus 12',
      download: '12',
      upload: '6',
      otherbenefits: [
        'C02 tax 2022 included',
        'incl. € 89.96 new customer bonus',
        '12 months limited price guarantee',
        'Optional 24 months price guarantee',
      ],
      amount: '165.30',
    },
  ];

  const environmentUrl = 'http://localhost:3000/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: httpMock, useClass: HttpTestingController },
        { provide: Logger, useClass: MockLoggerService },
      ],
    });
    injector = getTestBed();
    httpMock = TestBed.get(HttpTestingController);
    serviceTest = injector.get(TariffService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(serviceTest).toBeTruthy();
  });

  it('getTariffDetails() should check valid URL and mapTariffDetails should called', () => {
    spyOn(serviceTest, 'mapTariffDetails').and.callThrough();
    serviceTest
      .getTariffDetails()
      .subscribe((res) =>
        expect(serviceTest.mapTariffDetails).toHaveBeenCalledWith(res)
      );
    const reqMock = httpMock.expectOne(
      (req) =>
        req.method === 'GET' && req.url === environmentUrl + 'api/tariff/'
    );
    expect(reqMock.request.method).toBe('GET');
  });

  it('mapTariffDetails() should return valid tariffData', () => {
    const mockTarifDetails = [
      {
        id: '1',
        name: 'Montana bonus 12',
        download: '12',
        upload: '6',
        otherbenefits: [
          'C02 tax 2022 included',
          'incl. € 89.96 new customer bonus',
          '12 months limited price guarantee',
          'Optional 24 months price guarantee',
        ],
        amount: '165.30',
      },
    ];
    const result = serviceTest.mapTariffDetails(mockTarifDetails);
    expect(result).toEqual(dummyTarifDetails);
  });
});
