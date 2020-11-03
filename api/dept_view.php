<?PHP
    header('Content-Type: application/json; charset=UTF-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

    include_once('./inc/helper.php');
    include_once('./inc/db_helper.php');

    $deptno = get('deptno', FALSE);

    if (!$deptno) {
        print_rest_api('학과번호가 지정되지 않았습니다.', FALSE);
    }

    db_open();

    $sql = "SELECT deptno, dname, loc FROM department WHERE deptno=%d";

    $input = array($deptno);

    $result = db_query($sql, $input);

    if ($result === FALSE) {
        print_rest_api('데이터 조회에 실패했습니다. 관리자에게 문의하세요.', FALSE);
    }

    if (count($result) < 1) {
        print_rest_api('조회된 데이터가 없습니다.', FALSE);
    }

    db_close();

    $data = array('item' => $result[0]);

    print_rest_api('OK', $data);
?>
