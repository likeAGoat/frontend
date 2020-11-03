<?PHP
    header('Content-Type: application/json; charset=UTF-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

    include_once('./inc/helper.php');
    include_once('./inc/db_helper.php');

    $dname = post('dname', FALSE);
    $loc = post('loc', FALSE);

    if (!$dname) {
        print_rest_api('학과이름을 입력하세요.', FALSE);
    }

    if (!$loc) {
        print_rest_api('위치를 입력하세요.', FALSE);
    }

    db_open();

    $sql = "INSERT INTO department (dname, loc) VALUES ('%s', '%s')";

    $input = array($dname, $loc);

    $result = db_query($sql, $input);

    if ($result === FALSE) {
        print_rest_api('데이터 저장에 실패했습니다. 관리자에게 문의하세요.', FALSE);
    }

    $sql = "SELECT deptno, dname, loc FROM department WHERE deptno=%d";

    $input = array($result);

    $item = db_query($sql, $input);

    if ($item === FALSE) {
        print_rest_api('데이터 조회에 실패했습니다. 관리자에게 문의하세요.', FALSE);
    }

    if (count($item) < 1) {
        print_rest_api('조회된 데이터가 없습니다.', FALSE);
    }

    db_close();

    $data = array('item' => $item[0]);
    print_rest_api('OK', $data);
?>
