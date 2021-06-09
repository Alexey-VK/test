(function () {
  // Create the connector object
  const myConnector = tableau.makeConnector();

  // Define the schema
  myConnector.getSchema = function (schemaCallback) {
    const cols = [{
      id: 'id',
      dataType: tableau.dataTypeEnum.int,
    },
    {
      id: 'ttt_id',
      dataType: tableau.dataTypeEnum.int,
    },
    {
      id: 'name',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'date',
      alias: 'Year and month',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'pm',
      alias: 'Project Manager',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'sm',
      alias: 'Sales Manager',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'md_sold',
      alias: 'Man days sold',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'services_sold',
      alias: 'Services sold',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'exp_sold_eur',
      alias: 'Other expenses sold, EUR',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'exp_sold_usd',
      alias: 'Other expenses sold, USD',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'exp_sold_rub',
      alias: 'Other expenses sold, RUB',
      dataType: tableau.dataTypeEnum.string,
    },
    ];

    const tableSchema = {
      id: 'Invoicing_Tool',
      alias: 'Invoicing tool',
      columns: cols,
    };

    schemaCallback([tableSchema]);
  };

  const API_KEY = 'abc123';
  const BASE_URL = `https://invoicing-demo.noveogroup.com/api/v1/getRevenues?key=${API_KEY}&`;

  const MONTH_MAP = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ];

  /**
   * Создает URL адрес для получения статистики за текущий промежуток.
   * @param {string} startDate
   * @param {string} endDate
   */
  const createURL = (startDate, endDate) => `${BASE_URL}startDate=${startDate}&endDate=${endDate}`;

  /**
   * Возвращает строковый вариант месяца по его порядковому номеру
   * @param {number} number
   */
  // const getMonthIdByNumber = (number) => MONTH_MAP[number - 1];
  const getNumberByMonth = (month) => MONTH_MAP.indexOf(month) + 1;

  /**
   *
   * @param {object} row - Объект проекта, полученный из JSON.
   * @param {{
   *  year: number,
   *  month: number,
   *  yearIndex: number,
   * }} dateObject
   */
  const transformToTableRows = (row, targetArray) => {
    const {
      id, ttt_id, name, project_manager, sales_manager, sold,
    } = row;

    if (sold.length > 0) {
      sold.forEach((soldItem) => {
        for (const year in soldItem) {
          for (const month in soldItem[year]) {
            const other_expenses_sold_obj = {
              eur: 0,
              usd: 0,
              rub: 0,
            };

            function parseOtherExpencesSold(expencesSoldItem) {
              const currency = expencesSoldItem.split(' ')[1].toLowerCase();
              const value = parseFloat(expencesSoldItem.split(' ')[0]);
              other_expenses_sold_obj[currency] = value;
            }

            const { md_sold, services_sold, other_expenses_sold } = soldItem[year][month];
            const monthNum = getNumberByMonth(month);
            const date = `${year}-${monthNum < 10 ? `0${monthNum}` : monthNum}-01`;
            const other_expenses_sold_arr = other_expenses_sold.indexOf(',') > 0 ? other_expenses_sold.split(',') : [];

            if (other_expenses_sold_arr.length > 0) {
              other_expenses_sold_arr.forEach((expencesSoldItem) => {
                parseOtherExpencesSold(expencesSoldItem.trim());
              });
            } else if (other_expenses_sold.indexOf(' ') > 0) {
              parseOtherExpencesSold(other_expenses_sold.trim());
            }

            const tRow = {
              id,
              ttt_id,
              name,
              date,
              pm: project_manager,
              sm: sales_manager,
              md_sold,
              services_sold,
              exp_sold_eur: other_expenses_sold_obj.eur,
              exp_sold_usd: other_expenses_sold_obj.usd,
              exp_sold_rub: other_expenses_sold_obj.rub,
            };

            targetArray.push(tRow);
          }
        }
      });
    } else {
      return false;
    }
  };

  /**
   * Создает объект dateObject.
   * @param {number} index
   * @param {string} startDate
   */
  // const createDateObject = (index, startDate) => {
  //   var date = new Date(startDate);
  //   var startMonth = date.getMonth();
  //   var startYear = date.getFullYear();
  //   var newDate = new Date(startYear, startMonth + index, 1);

  //   var year = newDate.getFullYear();
  //   var month = newDate.getMonth() + 1;

  //   // В объекте projectObject поле sold это массив. yearIndex показывает какой порядковый
  //   // номер у текущего года в данном массиве.
  //   var yearIndex = year - startYear;

  //   return {
  //     year,
  //     month,
  //     yearIndex,
  //   };
  // };

  /**
   * Вычисляет количество месячных периодов между startDate и endDate.
   * Создает массив объектов, которые будут использованы для создания запросов на сервер.
   * @param {string} startDate
   * @param {string} endDate
   * @returns {
   *  id: number,
   *  startDate: string,
   *  endDate: string,
   * }[],
   */
  // var createDatesArray = (startDate, endDate) => {
  //   var datesArray = [];
  //   var start = new Date(startDate);
  //   var end = new Date(endDate);
  //   var basicMonthDiff = (end.getFullYear() - start.getFullYear()) * 12 + 1;
  //   basicMonthDiff -= start.getMonth();
  //   basicMonthDiff += end.getMonth();
  //   for (var index = 0; index < basicMonthDiff; index++) {
  //     datesArray.push(createDateObject(index, startDate));
  //   }

  //   return datesArray;
  // };

  // Download the data
  myConnector.getData = function (table, doneCallback) {
    const {
      startDate,
      endDate,
    } = JSON.parse(tableau.connectionData);

    let _tableData = [];

    $.getJSON(createURL(startDate, endDate), (jsonData) => {
      const { projects } = jsonData;

      projects.forEach((row) => {
        transformToTableRows(row, _tableData);
      });

      _tableData = _tableData.sort((a, b) => (Date.parse(a.date) - Date.parse(b.date)));

      table.appendRows(_tableData);
      doneCallback();
    });
  };

  tableau.registerConnector(myConnector);

  // Create event listeners for when the user submits the form
  $(document).ready(() => {
    $('.month-picker__input').datepicker();
    $('#submitButton').click(() => {
      const errorAlert = $('body #errorMsg');
      if (errorAlert.length > 0) {
        errorAlert.remove();
      }
      const dateObj = {
        startDate: $('#startDate').val().trim(),
        endDate: $('#endDate').val().trim(),
      };

      function isValidDate(dateStr) {
        const d = new Date(dateStr);
        return !isNaN(d.getDate());
      }

      if (isValidDate(dateObj.startDate) && isValidDate(dateObj.endDate)) {
        tableau.connectionData = JSON.stringify(dateObj);
        tableau.connectionName = 'Invoicing tool';
        tableau.submit();
      } else {
        const errorMsg = `
          <div id="errorMsg" class="alert alert-danger" role="alert">
            Enter valid dates. For example, 2016-05-08.
          </div>
        `;
        $('#detailed-group').append(errorMsg);
      }
    });
  });
}());
